# -*- coding: utf-8 -*-
"""
太极八卦图生成脚本（v6）

功能：在经典太极图外圈绘制八卦符号，分别生成【先天八卦】与【后天八卦】两套图，
      每套各输出：静态图（PNG，透明背景）+ 旋转动图（GIF，透明背景，无限循环）。

历次版本更新：
    v1：基础版本（卦爻加粗加长、去掉细圆圈、每卦独立函数、参数集中配置）。
    v3：先天/后天四隅方位按你的指定调整。
    v4：卦爻边缘 + 太极外圆边缘支持白色描边（宽度与颜色可调）。
    v5：爻线端部圆弧倒角大小可调（YAO_ROUND），设 0 则为平头。
    v6：卦爻颜色 / 每卦单独颜色 / 每爻单独颜色 / 太极黑白鱼颜色 / 鱼眼颜色全部可调；
        所有可调参数集中放到本文件开头的【参数配置区】，分组排列、逐行注释。
    v7：新增按阴阳全局配色——所有阳爻统一颜色(YAO_YANG_COLOR)、所有阴爻统一颜色(YAO_YIN_COLOR)。

先天 / 后天八卦的区别（方位不同，卦象内容相同）：
    先天八卦（伏羲）：乾南、巽东南、坎西、艮西南、坤北、震西北、离东、兑东北
    后天八卦（文王）：离南、坤东南、兑西、乾西南、坎北、艮西北、震东、巽东北

生成目录：所有成品自动保存到本脚本所在文件夹。
"""

# ==================== 导入所需库 ====================
from PIL import Image, ImageDraw    # 图像处理库：绘图、旋转、调色板转换、保存图片与动图
import numpy as np                  # 数值计算库：快速逐像素计算中央太极图的颜色
import os                           # 系统库：获取脚本所在目录、读取生成文件大小
import math                         # 数学库：三角函数，用于把方位角度换算成坐标


# ==================== 【参数配置区】（所有可调参数集中在此，按需修改，其余代码无需改动） ====================

# ---------- 1. 画布与清晰度 ----------
SIZE = 1000                          # 最终输出图片的边长（像素），数值越大图越清晰
SS = 3                              # 超采样倍数：先按 SIZE*SS 的大图绘制再缩小，倍数越高边缘越平滑

# ---------- 2. 动画（旋转动图） ----------
FPS = 120                            # 动画帧率（每秒播放的帧数，数值越大动画越流畅，建议 15~60）
ROUND_SECONDS = 3                  # 旋转一整圈所需秒数，数值越小转得越快（即转速）
# 注意：总帧数 = FPS × ROUND_SECONDS。之前设为 120×24=2880 帧时生成极慢且文件巨大，请谨慎调大。
DIRECTION = "顺时针"                # 旋转方向："顺时针" 或 "逆时针"

# ---------- 3. 布局尺寸 ----------
TAIJI_RATIO = 0.56                  # 中央太极半径占外圈大圆的比值（0~1，越大太极越大）
YAO_RADIUS = [0.71, 0.79, 0.87]     # 卦符三爻的半径位置（由内到外：初爻、中爻、上爻），整体越大卦符越靠外、越大
YAO_HALF_LEN = 0.23                 # 爻线半长占外圈大圆的比值（越大爻线越长；爻线沿切线方向延伸，理论上限约 0.49，超过会超出图片边缘，0.23 是安全的）
YAO_WIDTH = 0.061                   # 爻线宽度占外圈大圆的比值（越大爻线越粗：0.03≈细、0.045≈中、0.06≈粗）
YAO_GAP = 0.055                     # 阴爻中间断开空隙占外圈大圆的比值（越大断开越明显；约为爻宽的 1.2 倍较协调）

# ---------- 4. 描边 ----------
YAO_STROKE = 1                      # 卦爻描边宽度（像素，最终图；设为 0 则关闭描边）
YAO_STROKE_COLOR = (255, 255, 255)  # 卦爻描边颜色（RGB 三元组，默认白色，可改成任意色如 (255,0,0)）
TAIJI_STROKE = 2                    # 太极外圆描边宽度（像素，最终图；设为 0 则关闭描边）
TAIJI_STROKE_COLOR = (0, 0, 0)      # 太极外圆描边颜色（RGB 三元组，默认白色，可改成任意色如 (0,0,255)）

# ---------- 5. 爻线端部形状 ----------
YAO_ROUND = 0                       # 爻线端部圆弧倒角：0 = 平头（不要倒角）；>0 = 圆角半径与爻线宽度的比值（0.5≈半圆端头、0.3≈小圆角、0.1≈微微圆角）

# ---------- 6. 颜色 ----------
YAO_COLOR = (0, 0, 0)               # 所有卦爻的默认颜色（RGB，黑色；想整体改色就改这里）
YAO_YANG_COLOR = (200,30,30)               # 所有阳爻（实线 —）的统一颜色（RGB）；None = 不启用，阳爻仍用默认/每卦色
YAO_YIN_COLOR = (30,30,200)                # 所有阴爻（断线 --）的统一颜色（RGB）；None = 不启用，阴爻仍用默认/每卦色
# 示例：设 YAO_YANG_COLOR=(200,30,30)、YAO_YIN_COLOR=(30,30,200)，则全图阳爻变红、阴爻变蓝。
# 颜色优先级（从高到低）：每爻单独(GUA_YAO_COLORS) > 每卦(GUA_COLORS) > 按阴阳(YAO_YANG/YIN) > 默认(YAO_COLOR)
# 每个卦单独配色（可选）：{"卦名": (R,G,B)}，设置后该卦的三条爻全部使用此颜色
GUA_COLORS = {
    # "乾": (200, 30, 30),           # 示例：把乾卦三条爻都改成红色
    # "坤": (30, 60, 200),           # 示例：把坤卦三条爻都改成蓝色
}
# 每个卦的每条爻单独配色（可选）：{"卦名": [初爻色, 中爻色, 上爻色]}，顺序为初→中→上
GUA_YAO_COLORS = {
    # "兑": [(0,0,0), (0,0,0), (200,30,30)],   # 示例：只把兑卦上爻改成红色，其余仍默认
}
TAIJI_WHITE = (255, 255, 255)       # 太极图中白色鱼的颜色（RGB，默认白色）
TAIJI_BLACK = (0, 0, 0)             # 太极图中黑色鱼的颜色（RGB，默认黑色）
TAIJI_EYE_WHITE = (255, 255, 255)   # 黑鱼眼珠（白眼）的颜色（RGB，默认白色）
TAIJI_EYE_BLACK = (0, 0, 0)         # 白鱼眼珠（黑眼）的颜色（RGB，默认黑色）


# ==================== 由参数自动换算的内部值（一般无需修改） ====================
FRAMES = FPS * ROUND_SECONDS                       # 总帧数 = 帧率 × 转一圈的秒数
DEG_PER_FRAME = 360 / FRAMES                       # 每帧旋转角度 = 360° ÷ 总帧数
DURATION = 1000 // FPS                             # 每帧停留毫秒数 = 1000 ÷ 帧率
W = SIZE * SS                                      # 超采样大图的边长
CX = CY = W // 2                                   # 大图中心坐标（横、纵相同，图是正方形）
R_OUT = W // 2 - 4 * SS                            # 八卦图外圈大圆的半径（四周留出 4*SS 像素边距）


# ==================== 八卦卦象基础数据 ====================
# 每个卦由三爻组成，编码顺序为（初爻、中爻、上爻），从下往上；
# 1 代表阳爻（实线 —），0 代表阴爻（断线 --）。
BAGUA = {                            # 八卦名称与其三爻编码
    "乾": (1, 1, 1),                 # 乾 ☰：三阳爻（三连）
    "兑": (1, 1, 0),                 # 兑 ☱：下二阳、上一阴（上缺）
    "离": (1, 0, 1),                 # 离 ☲：上下阳、中间阴（中虚）
    "震": (1, 0, 0),                 # 震 ☳：下阳、上二阴（仰盂）
    "巽": (0, 1, 1),                 # 巽 ☴：下阴、上二阳（下断）
    "坎": (0, 1, 0),                 # 坎 ☵：上下阴、中间阳（中满）
    "艮": (0, 0, 1),                 # 艮 ☶：下二阴、上一阳（覆碗）
    "坤": (0, 0, 0),                 # 坤 ☷：三阴爻（六断）
}

# 先天八卦（伏羲）方位：元组为 (卦名, 角度)，角度以正上方为 0°、顺时针方向递增
# 先天八卦方位：四隅按用户指定排列（巽东南、兑东北、艮西南、震西北），四正位不变
XIAN_TIAN = [                        # 先天八卦按顺时针的方位顺序
    ("乾", 0),                       # 乾 在南（正上）
    ("巽", 45),                      # 巽 在东南（右上）
    ("坎", 90),                      # 坎 在西（正右）
    ("艮", 135),                     # 艮 在西南（右下）
    ("坤", 180),                     # 坤 在北（正下）
    ("震", 225),                     # 震 在西北（左下）
    ("离", 270),                     # 离 在东（正左）
    ("兑", 315),                     # 兑 在东北（左上）
]

# 后天八卦（文王）方位：同样以正上方为 0°、顺时针递增
# 后天八卦方位：四隅按用户指定排列（坤东南、乾西南、艮西北、巽东北），四正位不变
HOU_TIAN = [                         # 后天八卦按顺时针的方位顺序
    ("离", 0),                       # 离 在南（正上）
    ("坤", 45),                      # 坤 在东南（右上）
    ("兑", 90),                      # 兑 在西（正右）
    ("乾", 135),                     # 乾 在西南（右下）
    ("坎", 180),                     # 坎 在北（正下）
    ("艮", 225),                     # 艮 在西北（左下）
    ("震", 270),                     # 震 在东（正左）
    ("巽", 315),                     # 巽 在东北（左上）
]


# ==================== 辅助函数：获取某卦三爻各自的颜色 ====================
def get_yao_colors(name):
    """获取卦名 name 对应三爻的颜色列表（顺序：初爻、中爻、上爻）。
    优先级从高到低：
      ① 每爻单独配色(GUA_YAO_COLORS) > ② 整卦配色(GUA_COLORS) > ③ 按阴阳配色(YAO_YANG/YAO_YIN) > ④ 默认色(YAO_COLOR)。"""
    if name in GUA_YAO_COLORS:                       # ① 若配置了该卦的逐爻颜色
        return list(GUA_YAO_COLORS[name])            # 直接返回该卦三爻的颜色列表
    if name in GUA_COLORS:                           # ② 若配置了该卦的整卦颜色
        return [GUA_COLORS[name]] * 3                # 三条爻都使用该颜色
    colors = []                                      # ③④ 逐爻按阴阳/默认配色
    for yang in BAGUA[name]:                         # 遍历本卦三爻的阴阳编码（1=阳、0=阴）
        if yang and YAO_YANG_COLOR is not None:      # 若本爻为阳爻且启用了阳爻颜色
            colors.append(YAO_YANG_COLOR)            # 阳爻使用 YAO_YANG_COLOR
        elif (not yang) and YAO_YIN_COLOR is not None:   # 若本爻为阴爻且启用了阴爻颜色
            colors.append(YAO_YIN_COLOR)             # 阴爻使用 YAO_YIN_COLOR
        else:                                        # 否则
            colors.append(YAO_COLOR)                 # 使用默认颜色 YAO_COLOR
    return colors                                    # 返回三爻颜色列表


# ==================== 函数：绘制一条爻线 ====================
def _draw_one_yao(draw, angle_deg, yao_r, is_yang, hl, w, color):
    """在方位角 angle_deg、半径 yao_r 处绘制一条爻线。
    爻线沿圆周切线方向，左右对称；阳爻为整条实线，阴爻为中间断开的对称两段。
    参数：
        draw       : ImageDraw 绘图对象
        angle_deg  : 方位角度（正上方为 0°，顺时针）
        yao_r      : 本条爻到圆心的半径（像素）
        is_yang    : True 为阳爻（实线），False 为阴爻（两段断线）
        hl         : 爻线半长（像素），左右各延伸 hl
        w          : 爻线宽度（像素）
        color      : 本条爻的颜色（RGB 三元组）
    """
    rad = math.radians(angle_deg)    # 角度转弧度
    dx = math.sin(rad)               # 径向单位向量的 x 分量（正上方为 0，顺时针）
    dy = -math.cos(rad)              # 径向单位向量的 y 分量（图像 y 向下，正上方 dy 为负）
    tx = math.cos(rad)               # 切线单位向量的 x 分量（垂直于半径方向）
    ty = math.sin(rad)               # 切线单位向量的 y 分量
    ccx = CX + yao_r * dx            # 爻中心的横坐标
    ccy = CY + yao_r * dy            # 爻中心的纵坐标
    gap = YAO_GAP * R_OUT            # 阴爻中间断开的空隙宽度（随尺寸缩放）
    stroke_px = YAO_STROKE * SS      # 描边宽度换算成超采样大图像素（最终图 1px = 大图 SS px）
    stroke_rgba = YAO_STROKE_COLOR + (255,)   # 描边颜色补全成 RGBA（加不透明通道 255）
    body_rgba = tuple(color) + (255,)         # 爻主体颜色补全成 RGBA（加不透明通道 255）

    def draw_segment(x1, y1, x2, y2, cap1=True, cap2=True):
        """画一段爻线：先画描边色粗线+端点圆垫底，再叠画爻主体色线+端点圆。
        cap1/cap2 控制左/右两端是否画端点圆（阴爻断口侧不画，保持断口开放）；
        端部圆弧倒角大小由 YAO_ROUND 控制，设 0 则为平头（不要倒角）。"""
        if stroke_px > 0:                                            # 若启用了描边
            sw = w + 2 * stroke_px                                   # 描边层总宽 = 爻主体宽 + 两侧各一圈描边
            draw.line([x1, y1, x2, y2], fill=stroke_rgba, width=sw)  # 先画描边色粗线（宽度覆盖两侧）
            rr = YAO_ROUND * sw                                      # 描边层端部圆角半径（按 YAO_ROUND 比例换算）
            if cap1 and rr > 0:                                      # 左端点：启用且半径>0 才画描边圆角
                draw.ellipse([x1 - rr, y1 - rr, x1 + rr, y1 + rr], fill=stroke_rgba)
            if cap2 and rr > 0:                                      # 右端点：同上
                draw.ellipse([x2 - rr, y2 - rr, x2 + rr, y2 + rr], fill=stroke_rgba)
        draw.line([x1, y1, x2, y2], fill=body_rgba, width=w)         # 再画爻主体色线（居中覆盖描边中部）
        rb = YAO_ROUND * w                                           # 爻主体端部圆角半径（按 YAO_ROUND 比例换算）
        if cap1 and rb > 0:                                          # 左端点：启用且半径>0 才画主体圆角
            draw.ellipse([x1 - rb, y1 - rb, x1 + rb, y1 + rb], fill=body_rgba)
        if cap2 and rb > 0:                                          # 右端点：同上
            draw.ellipse([x2 - rb, y2 - rb, x2 + rb, y2 + rb], fill=body_rgba)

    if is_yang:                      # 阳爻：画一条左右对称的整线（两端都圆头）
        draw_segment(                # 调用描边画线辅助函数（含描边）
            ccx - hl * tx, ccy - hl * ty,                            # 左端点
            ccx + hl * tx, ccy + hl * ty,                            # 右端点
            True, True,                                              # 两端都画端点圆
        )
    else:                            # 阴爻：画两条左右对称的断线，中间留空隙
        draw_segment(                # 左半段（外侧端画圆、断口侧平头）
            ccx - hl * tx, ccy - hl * ty,                            # 左端点（外侧）
            ccx - gap / 2 * tx, ccy - gap / 2 * ty,                  # 断口左端点（平头不画圆）
            True, False,                                             # 仅左端画圆
        )
        draw_segment(                # 右半段（外侧端画圆、断口侧平头）
            ccx + gap / 2 * tx, ccy + gap / 2 * ty,                  # 断口右端点（平头不画圆）
            ccx + hl * tx, ccy + hl * ty,                            # 右端点（外侧）
            False, True,                                             # 仅右端画圆
        )


# ==================== 八个卦的独立绘制函数（可自由打乱调用） ====================
# 每个卦函数都把本卦的三爻（初、中、上）按 YAO_RADIUS 从内到外画出；
# 调用方式统一为：draw_卦名(draw, angle_deg, hl, w, colors)，便于用户随意调整顺序、方位与颜色。
def draw_qian(draw, angle_deg, hl, w, colors):
    """绘制乾卦 ☰（三阳爻），三爻全部为实线"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, True,  hl, w, colors[0])   # 初爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, True,  hl, w, colors[1])   # 中爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, True,  hl, w, colors[2])   # 上爻：阳


def draw_dui(draw, angle_deg, hl, w, colors):
    """绘制兑卦 ☱（上缺），上爻为阴、中下二爻为阳"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, True,  hl, w, colors[0])   # 初爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, True,  hl, w, colors[1])   # 中爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, False, hl, w, colors[2])   # 上爻：阴（断开）


def draw_li(draw, angle_deg, hl, w, colors):
    """绘制离卦 ☲（中虚），中爻为阴、上下二爻为阳"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, True,  hl, w, colors[0])   # 初爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, False, hl, w, colors[1])   # 中爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, True,  hl, w, colors[2])   # 上爻：阳


def draw_zhen(draw, angle_deg, hl, w, colors):
    """绘制震卦 ☳（仰盂），初爻为阳、中上二爻为阴"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, True,  hl, w, colors[0])   # 初爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, False, hl, w, colors[1])   # 中爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, False, hl, w, colors[2])   # 上爻：阴（断开）


def draw_xun(draw, angle_deg, hl, w, colors):
    """绘制巽卦 ☴（下断），初爻为阴、中上二爻为阳"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, False, hl, w, colors[0])   # 初爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, True,  hl, w, colors[1])   # 中爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, True,  hl, w, colors[2])   # 上爻：阳


def draw_kan(draw, angle_deg, hl, w, colors):
    """绘制坎卦 ☵（中满），中爻为阳、上下二爻为阴"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, False, hl, w, colors[0])   # 初爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, True,  hl, w, colors[1])   # 中爻：阳
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, False, hl, w, colors[2])   # 上爻：阴（断开）


def draw_gen(draw, angle_deg, hl, w, colors):
    """绘制艮卦 ☶（覆碗），上爻为阳、中下二爻为阴"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, False, hl, w, colors[0])   # 初爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, False, hl, w, colors[1])   # 中爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, True,  hl, w, colors[2])   # 上爻：阳


def draw_kun(draw, angle_deg, hl, w, colors):
    """绘制坤卦 ☷（三阴），三爻全部为阴（断开）"""
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[0] * R_OUT, False, hl, w, colors[0])   # 初爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[1] * R_OUT, False, hl, w, colors[1])   # 中爻：阴（断开）
    _draw_one_yao(draw, angle_deg, YAO_RADIUS[2] * R_OUT, False, hl, w, colors[2])   # 上爻：阴（断开）


# ==================== 函数：绘制八卦环（按给定卦序调用各卦函数） ====================
def draw_bagua_ring(draw, positions):
    """按 positions（卦名与方位角列表）绘制八卦环。
    每个卦通过 BAGUA_FUNC 映射表调用其独立绘制函数，顺序可自由打乱。"""
    # 爻线半长与宽度：按比例换算成实际像素，并保证最小可辨
    hl = YAO_HALF_LEN * R_OUT                    # 爻线半长（像素）
    w = max(2, int(YAO_WIDTH * R_OUT))           # 爻线宽度（像素，至少 2）
    # 卦名 -> 卦绘制函数的映射表（供打乱顺序时按名调用）
    bagua_func = {
        "乾": draw_qian, "兑": draw_dui, "离": draw_li, "震": draw_zhen,   # 阳卦映射
        "巽": draw_xun, "坎": draw_kan, "艮": draw_gen, "坤": draw_kun,    # 阴卦映射
    }
    for name, ang in positions:                  # 遍历传入的卦序列表
        colors = get_yao_colors(name)            # 获取本卦三爻各自的颜色
        bagua_func[name](draw, ang, hl, w, colors)   # 调用对应卦函数，在指定方位绘制（带颜色）


# ==================== 函数：生成中央的太极图 ====================
def make_taiji_rgba(rt):
    """以圆心 (CX,CY)、半径 rt 生成标准太极图，返回透明背景的 RGBA 图像。
    布局：白鱼在左（鱼头朝上）、黑鱼在右（鱼头朝下）。
    黑白鱼及鱼眼颜色由 TAIJI_WHITE / TAIJI_BLACK / TAIJI_EYE_WHITE / TAIJI_EYE_BLACK 控制。"""
    yy, xx = np.mgrid[0:W, 0:W]      # 生成 W×W 网格坐标：xx 为横坐标矩阵、yy 为纵坐标矩阵
    x = xx - CX                      # 横坐标平移到以圆心为原点
    y = yy - CY                      # 纵坐标平移到以圆心为原点
    in_circle = (x * x + y * y) <= rt * rt     # 判断像素是否在太极圆内部
    half = rt / 2.0                  # 太极半径的一半，用于构造 S 曲线的小圆半径

    # 计算 S 曲线在每个像素位置的横向坐标 Sx（把圆分成左白右黑）
    Sx = np.zeros((W, W), dtype=float)         # 初始化 Sx 为全 0 的矩阵
    top = y < 0                      # 标记圆心上方的像素
    Sx[top] = np.sqrt(np.maximum(0.0, half * half - (y[top] + half) ** 2))    # 上半段 S 曲线（顶部小圆右半弧）
    bot = y > 0                      # 标记圆心下方的像素
    Sx[bot] = -np.sqrt(np.maximum(0.0, half * half - (y[bot] - half) ** 2))   # 下半段 S 曲线（底部小圆左半弧）

    # 根据 S 曲线判定黑 / 白
    black = (x >= Sx) & in_circle    # 黑色区域：S 曲线右侧且在大圆内
    white = in_circle & ~black       # 白色区域：大圆内其余部分（S 曲线左侧）

    # 用 RGBA 数组填充颜色（颜色可调）
    img = np.zeros((W, W, 4), dtype=np.uint8)  # 创建全透明的 RGBA 数组
    img[white] = TAIJI_WHITE + (255,)          # 白色鱼区域：用 TAIJI_WHITE、不透明
    img[black] = TAIJI_BLACK + (255,)          # 黑色鱼区域：用 TAIJI_BLACK、不透明

    # 绘制两个鱼眼（小圆点，颜色可调）
    er = rt / 8.0                    # 鱼眼半径 = 太极半径的 1/8
    def eye(cx0, cy0):
        """返回布尔矩阵：距点 (cx0,cy0) 不超过鱼眼半径的位置为 True"""
        return (x - cx0) ** 2 + (y - cy0) ** 2 <= er * er
    img[eye(0.0, -half)] = TAIJI_EYE_BLACK + (255,)   # 白鱼的黑眼（上方鱼头中央，颜色可调）
    img[eye(0.0, half)] = TAIJI_EYE_WHITE + (255,)    # 黑鱼的白眼（下方鱼头中央，颜色可调）

    return Image.fromarray(img, 'RGBA')        # 转成 PIL 的 RGBA 图像并返回


# ==================== 函数：生成一张完整的太极八卦图 ====================
def make_bagua_image(positions):
    """按给定的八卦方位 positions 生成一张太极八卦图，返回透明背景的 RGBA 大图。"""
    canvas = Image.new("RGBA", (W, W), (0, 0, 0, 0))   # 创建透明画布
    rt = TAIJI_RATIO * R_OUT         # 中央太极的实际半径（按比例换算）
    taiji = make_taiji_rgba(rt)      # 生成中央太极图
    canvas.paste(taiji, (0, 0), taiji)   # 把太极粘贴到画布中央（用自身 alpha 作为蒙版）

    d = ImageDraw.Draw(canvas)       # 创建画图对象，用于绘制太极描边与卦符
    # ---- 太极外圆描边 ----
    if TAIJI_STROKE > 0:                                     # 若启用了太极圆描边
        t_stroke = max(1, TAIJI_STROKE * SS)                 # 描边宽度换算成超采样大图像素（至少 1）
        d.ellipse(                                           # 画一个空心圆环（描边）
            [CX - rt, CY - rt, CX + rt, CY + rt],            # 外接正方形 = 太极圆直径
            outline=TAIJI_STROKE_COLOR + (255,),             # 描边颜色（补全为 RGBA）
            width=t_stroke,                                  # 圆环线宽
        )
    draw_bagua_ring(d, positions)    # 绘制外圈八卦环（不画任何圆圈边框）

    return canvas                    # 返回完整的太极八卦图


# ==================== 函数：把 RGBA 帧转成 GIF 支持的 P 模式 ====================
def to_gif_frame(rgba):
    """把单帧 RGBA 图像转成统一调色板的 P 模式，以便存成透明 GIF。
    调色板约定：0=黑 1=白 2=透明(用品红占位，保存时声明为透明) 3~255=灰阶过渡"""
    rgb = rgba.convert("RGB")        # 去掉透明度通道，只保留颜色
    alpha = rgba.getchannel("A")     # 单独取出透明度通道作为蒙版
    magenta = Image.new("RGB", rgba.size, (255, 0, 255))   # 新建品红色底图
    rgb = Image.composite(rgb, magenta, alpha)   # 透明区合成品红，非透明区保留原色
    pal = Image.new("P", (1, 1))     # 新建 1×1 调色板图像
    data = [0, 0, 0, 255, 255, 255, 255, 0, 255]   # 索引 0=黑、1=白、2=品红
    for i in range(253):             # 填充其余 253 个颜色（黑到白灰阶）
        v = round(i * 255 / 252)     # 灰阶值从 0 渐变到 255
        data += [v, v, v]            # 灰阶 RGB 三通道相同
    pal.putpalette(data)             # 写入调色板
    return rgb.quantize(palette=pal, dither=Image.Dither.NONE)   # 量化到固定调色板（禁抖动）


# ==================== 主流程：分别生成先天、后天两套图 ====================
# 用 if __name__ == "__main__" 保护：本脚本被其他脚本 import 时不会自动执行生成流程，
# 只暴露上面定义的函数供复用（如单独调用 make_bagua_image 调试），直接运行本脚本才生成成品。
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))    # 脚本所在目录（成品输出到这里）

    for kind, positions in [("先天", XIAN_TIAN), ("后天", HOU_TIAN)]:   # 遍历两套八卦
        print(f"== 正在生成{kind}八卦 ==")                    # 打印进度提示
        base = make_bagua_image(positions)                    # 生成完整大图

        # ---- 1. 保存静态图片（PNG，透明背景）----
        static = base.resize((SIZE, SIZE), Image.Resampling.LANCZOS)   # 缩小到目标尺寸
        png_path = os.path.join(script_dir, f"{kind}八卦太极图.png")   # 静态图完整路径
        static.save(png_path)                                  # 保存 PNG
        print("静态图:", png_path)                             # 打印静态图路径

        # ---- 2. 生成旋转动图（GIF，透明背景）----
        frames = []                                            # 存放所有旋转帧
        for i in range(FRAMES):                                # 逐帧生成
            # 根据旋转方向计算本帧角度（PIL 的 rotate 正角度为逆时针）
            if DIRECTION == "顺时针":                          # 顺时针
                angle = -(i * DEG_PER_FRAME) % 360             # 取负角度
            else:                                              # 逆时针
                angle = (i * DEG_PER_FRAME) % 360              # 取正角度
            frame = base.rotate(angle, resample=Image.Resampling.BICUBIC, center=(CX, CY))   # 整体旋转
            if SS > 1:                                         # 超采样时缩小回目标尺寸
                frame = frame.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
            frames.append(to_gif_frame(frame))                 # 转成 GIF 帧并收集
            if (i + 1) % 30 == 0:                              # 每 30 帧打印一次进度
                print(f"  已处理 {i + 1}/{FRAMES} 帧")

        gif_path = os.path.join(script_dir, f"{kind}八卦太极图.gif")   # 动图完整路径
        frames[0].save(                                          # 保存 GIF 动图
            gif_path,                                            # 输出路径
            save_all=True,                                       # 保存多帧动画
            append_images=frames[1:],                            # 追加其余帧
            loop=0,                                              # 无限循环
            disposal=2,                                          # 每帧后恢复透明背景
            transparency=2,                                      # 索引 2 为透明色
            duration=DURATION,                                   # 每帧停留毫秒数
            optimize=True,                                       # 优化体积
        )
        print("动图:", gif_path, f"({os.path.getsize(gif_path) / 1024 / 1024:.2f} MB)")   # 打印动图路径与大小

    print("全部生成完成！")                                      # 结束提示
