# -*- coding: utf-8 -*-
"""
高清旋转太极图 GIF 生成脚本（头像用）

功能：生成背景透明、经典黑白阴阳鱼造型、持续旋转的 GIF 动图。
布局采用标准 S 曲线构造：白鱼在左（鱼头朝上）、黑鱼在右（鱼头朝下）。

所有可调参数集中在下方【参数配置区】：
    尺寸、转速、旋转方向、超采样倍数等均可按需修改，其余代码无需改动。
生成目录：GIF 会自动保存到本脚本所在文件夹，文件名为 taiji.gif。
"""

# ==================== 导入所需库 ====================
from PIL import Image         # 图像处理库：负责绘图、旋转、调色板转换、保存 GIF
import numpy as np            # 数值计算库：用数组快速逐像素计算太极图各点的颜色
import os                     # 系统库：获取脚本所在目录、读取生成文件的大小


# ==================== 【参数配置区】（按需修改） ====================
SIZE = 800                    # 最终输出 GIF 的边长（像素），数值越大图越清晰
SS = 3                        # 超采样倍数：先按 SIZE*SS 的大图绘制再缩小，倍数越高边缘越平滑
FPS = 25                      # 动画帧率（每秒播放的帧数），数值越大动画越流畅
ROUND_SECONDS = 3             # 旋转一整圈所需秒数，数值越小转得越快（即转速）
DIRECTION = "顺时针"           # 旋转方向："顺时针" 或 "逆时针"


# ==================== 由参数自动换算的内部值（一般无需修改） ====================
FRAMES = FPS * ROUND_SECONDS                     # 总帧数 = 帧率 × 转一圈的秒数
DEG_PER_FRAME = 360 / FRAMES                     # 每帧旋转角度 = 360° ÷ 总帧数
DURATION = 1000 // FPS                           # 每帧停留毫秒数 = 1000 ÷ 帧率
W = SIZE * SS                                    # 超采样大图的边长
CX = CY = W // 2                                 # 大图中心坐标（横、纵相同，因为图是正方形）
R = W // 2 - 4 * SS                              # 太极圆半径（四周留出 4*SS 像素边距）


# ==================== 函数：生成单张静态太极图 ====================
def make_taiji():
    """用 S 曲线逐像素判定生成标准太极图（白鱼在左、黑鱼在右），返回透明背景的 RGBA 图像"""
    yy, xx = np.mgrid[0:W, 0:W]                  # 生成 W×W 网格坐标：xx 为横坐标矩阵、yy 为纵坐标矩阵
    x = xx - CX                                  # 横坐标平移到以圆心为原点（圆心处 x=0）
    y = yy - CY                                  # 纵坐标平移到以圆心为原点（圆心处 y=0）
    in_circle = (x * x + y * y) <= R * R         # 判断每个像素是否在大圆内部（到圆心距离平方 ≤ 半径平方）
    half = R / 2.0                               # 大圆半径的一半，用作构造 S 曲线的小圆半径

    # ---- 计算 S 曲线在每个像素位置的横向坐标 Sx（把圆分成左白右黑）----
    Sx = np.zeros((W, W), dtype=float)           # 初始化 Sx 为全 0 的矩阵（横坐标值）
    top = y < 0                                  # 标记所有位于圆心上方的像素（上半部分）
    # 上半段 S 曲线 = 顶部小圆（圆心 (0,-R/2)、半径 R/2）的右半弧，Sx 取正值
    Sx[top] = np.sqrt(np.maximum(0.0, half * half - (y[top] + half) ** 2))
    bot = y > 0                                  # 标记所有位于圆心下方的像素（下半部分）
    # 下半段 S 曲线 = 底部小圆（圆心 (0,R/2)、半径 R/2）的左半弧，Sx 取负值
    Sx[bot] = -np.sqrt(np.maximum(0.0, half * half - (y[bot] - half) ** 2))

    # ---- 根据 S 曲线判定每个像素是黑还是白 ----
    black = (x >= Sx) & in_circle                # 黑色区域：x 坐标 ≥ Sx（S 曲线右侧）且在大圆内
    white = in_circle & ~black                   # 白色区域：大圆内除去黑色区域（即 S 曲线左侧）

    # ---- 用 RGBA 数组填充颜色（A=255 表示不透明，A=0 表示透明）----
    img = np.zeros((W, W, 4), dtype=np.uint8)    # 创建全透明的 RGBA 数组（默认全为 0）
    img[white] = [255, 255, 255, 255]            # 白色区域设为：白、不透明
    img[black] = [0, 0, 0, 255]                  # 黑色区域设为：黑、不透明

    # ---- 绘制两个鱼眼（小圆点）----
    er = R / 8.0                                 # 鱼眼半径 = 大圆半径的 1/8
    def eye(cx0, cy0):
        """返回布尔矩阵：距离点 (cx0,cy0) 小于等于鱼眼半径的位置为 True"""
        return (x - cx0) ** 2 + (y - cy0) ** 2 <= er * er   # 点到目标圆心距离平方 ≤ 鱼眼半径平方
    img[eye(0.0, -half)] = [0, 0, 0, 255]        # 白鱼的黑眼：位于圆心正上方 R/2 处（白色鱼头中央）
    img[eye(0.0, half)] = [255, 255, 255, 255]   # 黑鱼的白眼：位于圆心正下方 R/2 处（黑色鱼头中央）

    return Image.fromarray(img, 'RGBA')          # 把 numpy 数组转成 PIL 的 RGBA 图像并返回


# ==================== 函数：把 RGBA 帧转成 GIF 支持的 P 模式 ====================
def to_gif_frame(rgba):
    """把单帧 RGBA 图像转成统一调色板的 P 模式，以便存成透明 GIF。
    调色板约定：0=黑 1=白 2=透明(用品红占位，保存时声明为透明) 3~255=灰阶过渡"""
    rgb = rgba.convert("RGB")                    # 去掉透明度通道，只保留颜色信息
    alpha = rgba.getchannel("A")                 # 单独取出透明度通道作为蒙版
    magenta = Image.new("RGB", rgba.size, (255, 0, 255))   # 新建一张与图像同尺寸的品红色底图
    rgb = Image.composite(rgb, magenta, alpha)   # 用 alpha 做蒙版：透明区合成成品红，非透明区保留原色
    pal = Image.new("P", (1, 1))                 # 新建 1×1 的调色板图像（用于承载自定义调色板）
    data = [0, 0, 0, 255, 255, 255, 255, 0, 255] # 调色板前 3 个颜色：索引0=黑、索引1=白、索引2=品红
    for i in range(253):                         # 填充剩余的 253 个颜色（黑到白的灰阶渐变）
        v = round(i * 255 / 252)                 # 灰阶值从 0 均匀渐变到 255
        data += [v, v, v]                        # 灰阶即 RGB 三个通道取相同值
    pal.putpalette(data)                         # 把构造好的调色板写入调色板图像
    return rgb.quantize(palette=pal, dither=Image.Dither.NONE)   # 量化到该固定调色板（禁用抖动，颜色更纯净）


# ==================== 主流程：逐帧生成旋转画面并保存 GIF ====================
base = make_taiji()                              # 先生成一张静态太极图作为旋转“母版”
frames = []                                      # 用于存放所有旋转帧的列表
for i in range(FRAMES):                          # 按总帧数逐帧生成
    # 根据用户设定的旋转方向计算本帧的旋转角度（PIL 的 rotate 正角度为逆时针）
    if DIRECTION == "顺时针":                    # 若用户选择顺时针
        angle = -(i * DEG_PER_FRAME) % 360       # 取负角度 = 顺时针旋转，并保证角度在 0~360 之间
    else:                                        # 否则（"逆时针"或其他值）
        angle = (i * DEG_PER_FRAME) % 360        # 取正角度 = 逆时针旋转
    # 把母版图绕圆心旋转 angle 度（BICUBIC 重采样保证旋转质量）
    frame = base.rotate(angle, resample=Image.Resampling.BICUBIC, center=(CX, CY))
    if SS > 1:                                   # 若超采样倍数大于 1（即开启了超采样）
        frame = frame.resize((SIZE, SIZE), Image.Resampling.LANCZOS)   # 缩小回目标尺寸（LANCZOS 高质量缩放）
    frames.append(to_gif_frame(frame))           # 把该帧转成 GIF 帧格式并收集进列表
    if (i + 1) % 30 == 0:                        # 每处理 30 帧打印一次进度
        print(f"已处理 {i + 1}/{FRAMES} 帧")     # 打印当前进度

# 生成目录：设置为脚本所在文件夹（无论脚本放在哪里都输出到它旁边）
script_dir = os.path.dirname(os.path.abspath(__file__))    # 获取本脚本所在目录的绝对路径
out = os.path.join(script_dir, "taiji.gif")                # 拼接输出文件完整路径（脚本目录下的 taiji.gif）

# 把第一帧作为基础帧、其余帧作为动画帧，一次性保存为 GIF 动图
frames[0].save(
    out,                                           # 输出文件路径
    save_all=True,                                 # 允许保存多帧动画
    append_images=frames[1:],                      # 追加第 2 帧到最后一帧
    loop=0,                                        # 0 表示无限循环播放
    disposal=2,                                    # 每帧播放后恢复透明背景，避免动画残影
    transparency=2,                                # 声明调色板索引 2 为透明色（即之前填充的品红区域）
    duration=DURATION,                             # 每帧停留毫秒数（由 FPS 自动算出）
    optimize=True,                                 # 开启优化以压缩文件体积
)
print("GIF 已生成:", out, f"({os.path.getsize(out) / 1024 / 1024:.2f} MB)")   # 打印生成路径与文件大小
