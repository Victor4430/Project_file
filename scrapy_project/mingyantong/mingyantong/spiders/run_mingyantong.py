#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :music_rename.py
# @Time      :2022/1/23 13:59
# @Author    :杨晓东
# @email     :lzj155@foxmail.com
# @homepage  :www.demo443.com
from scrapy import cmdline


def run():
    # 方式一：注意execute的参数类型为一个列表
    cmdline.execute('scrapy crawl mingyan'.split())

if __name__ == "__main__":
    run()
