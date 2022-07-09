#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> req_xxootxt.py
# @IDE       :PyCharm
# @Time      :2022/3/29 23:41
# @Author    :杨晓东
# @email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import requests


def run():
    print('开始了....')
    url = 'https://yazhouse8.com/2jXJj.htm'
    a = requests.get(url)
    print(a.text)


if __name__ == "__main__":
    run()
