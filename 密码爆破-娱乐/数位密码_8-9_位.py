#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 数位密码_8-9_位.py
# @IDE       :PyCharm
# @Time      :2022/7/2 23:32
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import itertools, string

words = '0123456789'


def generatePassword(repeat):
    count = 0
    with open('F:\passwd1.txt', 'a', encoding='utf-8') as f:
        for item in itertools.product(words, repeat=repeat):
            count += 1
            b = ''.join(item)
            if b[0] == '0' or b[1] == '0' or b[2] == '0':
                continue
            # print(b,'0000')
            f.write(b + '\n')
            print(b,' 已写入....')

    print("密码，一共 " + str(count) + " 组！", '\n',
                         'passwd.txt  写入完成！')



def generatePasswordForRepeat(min, max):
    for i in range(max - min):
        generatePassword(min + i)


# 获取9位密码字典
# passwords = generatePassword(9)
# print(next(passwords))

# # 获取4到9位密码
# passwords = generatePasswordForRepeat(10, 11)
# print(next(passwords))

generatePassword(11)
