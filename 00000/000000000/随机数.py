#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 随机数.py
# @IDE       :PyCharm
# @Time      :2022/11/13 1:02
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import time
import random


# 装饰器 计时器
def time_out(a_func):
    def clocked(*args, **kwargs):
        start = time.time()
        result = a_func(*args, **kwargs)
        end = time.time()
        print("程序：" + a_func.__name__, "    运行时间：" + str(end - start))
        return result
    return clocked


def run():
    aa = []
    bb = []
    while len(aa) < 5:
        for i in range(5):
            a = random.randint(1, 35)
            if a in aa:
                continue
            else:
                aa.append(a)
                break
    while len(bb) < 2:
        for i in range(2):
            b = random.randint(1, 12)
            if b in bb:
                continue
            else:
                bb.append(b)
                break
    print(sorted(aa) + sorted(bb))


if __name__ == "__main__":
    # run()
    for i in range(1000):
        run()