#!/usr/bin/env python
# -*- coding:utf-8 -*-
'''
可做 大部分图片验证码识别
'''


def run():
    import os
    import ddddocr
    # 实例化  验证码识别的类方法
    ocr = ddddocr.DdddOcr()
    # 标识 验证码目录 & 生成目录
    path_0 = 'D:\下载暂存\天猫_工商执照'
    path_1 = 'D:\下载暂存\天猫_工商执照\验证码.jpeg'
    with open(path_1, 'rb') as f:
        # 给二进制数据  赋予句柄
        img = f.read()
        # 调用验证码识别方法  开始识别传入的二进制数据
        res = ocr.classification(img)
        # 输出识别后的数据
        print('当前验证码是：',res)
        # 设置验证码文件名路径
        a = os.path.join(path_0, res)
        # 开始创建识别后验证码文件
        with open(a, 'w', encoding="utf-8") as fp:
            # 内容写入验证码
            fp.write(res)
            print(res,'  验证码 文件 已创建！')



if __name__ == "__main__":
    run()
