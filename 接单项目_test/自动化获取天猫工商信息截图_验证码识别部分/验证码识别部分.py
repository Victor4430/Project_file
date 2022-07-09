#!/usr/bin/env python
# -*- coding:utf-8 -*-
'''
可做 大部分图片验证码识别
'''

import time
import ddddocr
import os


def run():
    # 实例化  验证码识别的类方法
    ocr = ddddocr.DdddOcr()
    # 标识 验证码目录 & 生成目录
    path_0 = 'D:\下载暂存\天猫_工商执照'
    print('验证码存放地址：',path_0)
    path_1 = 'D:\下载暂存\天猫_工商执照\验证码.jpeg'
    print('验证码图片完整地址：',path_1)
    # 打开验证码图片   使用二进制读取文件
    with open(path_1, 'rb') as f:
        print("正在打开验证码图片....... ")
        # 给二进制数据  赋予句柄
        img = f.read()
        print("正在使用二进制读取文件......")

        # 调用验证码识别方法  开始识别传入的二进制数据
        res = ocr.classification(img)
        # 输出识别后的数据
        print('当前验证码是：', res)
        # 设置验证码文件名路径
        a = os.path.join(path_0, res)
        # 开始创建识别后验证码文件
        with open(a, 'w', encoding="utf-8") as fp:
            print("开始创建识别后验证码文件........")
            # 内容写入验证码
            fp.write(res)
            time.sleep(5)
            print(res, '  验证码 文件 已创建！')
            time.sleep(5)



if __name__ == "__main__":
    run()
