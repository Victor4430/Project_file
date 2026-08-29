#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> cmd批量运行.py
# @IDE       :PyCharm
# @Time      :2022/12/2 15:43
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import os
import threading

def run():
    os.system("python .\seleniun_js刷访问量.py")

if __name__ == "__main__":
    threads = []  # 定义一个线程池
    for i in range(1, 3):
        threads.append(threading.Thread(target=run))  # 把t1线程装到线程池里
    for t in threads:
        print('00000000000000000000000000000000000000000000000000000000')
        t.start()
    for t in threads:
        print('11111111111111111111111111111111111111111111111111111111')
        t.join()
    print('睡觉了')


