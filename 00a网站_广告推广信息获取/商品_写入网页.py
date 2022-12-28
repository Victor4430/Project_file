#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 商品_写入网页.py
# @IDE       :PyCharm
# @Time      :2022/12/14 0:07
# @Author    :Victor
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

import csv
import time
import requests
from lxml import etree


# 装饰器 计时器
def time_out(a_func):
    def clocked(*args, **kwargs):
        start = time.time()
        result = a_func(*args, **kwargs)
        end = time.time()
        print("程序：" + a_func.__name__, "    运行时间：" + str(end - start))
        return result

    return clocked


# s1 = ' <div class="Big_Box">'  # 空
# s2 = '			<div class="S_Box">'  # 空
# s3 = '				<a class="A1" target="_blank" title="{}"'  # 商品名
# s4 = '  					href="{}">'  # 商品url
# s5 = '                    <img class="Img_1" src="{}"'  # 图片url
# s6 = ' 						alt="{}">'  # 商品名
# s7 = ' 				</a>'  # 空
# s8 = '				<a class="A2" target="_blank" title="{}"'  # 商品名
# s9 = ' 					href="{}">'  # 商品url
# s10 = ' 					<p class="P0">{}</p>'  # 商品名
# s11 = ' 					<p class="P1">{}</p>'   # 券后价
# s12 = ' 					<s class="P2">{}</s>'  # 原价
# s13 = ' 					<p class="P3">{}</p>'  # 销量
# s14 = ' 					<p class="P4">{}}</p>'  # 店铺名
# s15 = ' 				</a>'  # 空
# s16 = ' 				<a class="A3" target="_blank" title="{}"'  # 商品名
# s17 = ' 					href="{}">'  # 商品url
# s18 = ' 					<p class="P5">'  # 空
# s19 = ' 						立即查看'  # 空
# s20 = ' 					</p>'  # 空
# s21 = ' 				</a>'  # 空
# s22 = ' 			</div>'  # 空


# csv 读取_方法
@time_out
def csv_data_read():
    # s1 = ' <div class="Big_Box">'  # 空
    s2 = '			<div class="S_Box">'  # 空
    s3 = '				<a class="A1" target="_blank" title="{}"'  # 商品名
    s4 = '  					href="{}">'  # 商品url
    s5 = '                    <img class="Img_1" src="{}"'  # 图片url
    s6 = ' 						alt="{}">'  # 商品名
    s7 = ' 				</a>'  # 空
    s8 = '				<a class="A2" target="_blank" title="{}"'  # 商品名
    s9 = ' 					href="{}">'  # 商品url
    s10 = ' 					<p class="P0">{}</p>'  # 商品名
    s11 = ' 					<p class="P1">{}</p>'  # 券后价
    s12 = ' 					<s class="P2">{}</s>'  # 原价
    s13 = ' 					<p class="P3">{}</p>'  # 销量
    s14 = ' 					<p class="P4">{}</p>'  # 店铺名
    s15 = ' 				</a>'  # 空
    s16 = ' 				<a class="A3" target="_blank" title="{}"'  # 商品名
    s17 = ' 					href="{}">'  # 商品url
    s18 = ' 					<p class="P5">'  # 空
    s19 = ' 						立即查看'  # 空
    s20 = ' 					</p>'  # 空
    s21 = ' 				</a>'  # 空
    s22 = ' 			</div>'  # 空

    # 读取csv时需要使用reader，并传如一个文件对象，而且reader返回的是一个可迭代的对象，需要使用for循环遍历
    # 在上面，row是一个列表，如果想要查看固定的某列，则需要加上下标，例如我想要查看name，那么只需要改为row[1]
    with open('./广告展示.html', 'a', encoding='utf-8') as fp:
        with open('./商品信息_写入html.csv') as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if len(row) == 0:
                    print(row)
                    print("此行为空  已跳过...........")
                    continue
                print(row)
                # fp.write(s1 + '\n')
                fp.write(s2 + '\n')
                fp.write(s3.format(row[1]) + '\n')  # 商品名称
                fp.write(s4.format(row[4].replace('商品链接：', '')) + '\n')  # 商品url
                fp.write(s5.format(row[0]) + '\n')  # 图片url
                fp.write(s6.format(row[1]) + '\n')  # 商品名称
                fp.write(s7 + '\n')
                fp.write(s8.format(row[1]) + '\n')  # 商品名称
                fp.write(s9.format(row[4].replace('商品链接：', '')) + '\n')  # 商品url
                fp.write(s10.format(row[1]) + '\n')  # 商品名称
                fp.write(s11.format(row[3]) + '\n')  # 券后价
                fp.write(s12.format(row[2].replace('价格', '原价')) + '\n')  # 原价
                fp.write(s13.format(row[5]) + '\n')  # 销量
                fp.write(s14.format(row[6]) + '\n')  # 店铺名
                fp.write(s15 + '\n')
                fp.write(s16.format(row[1]) + '\n')  # 商品名称
                fp.write(s17.format(row[4].replace('商品链接：', '')) + '\n')  # 商品url
                fp.write(s18 + '\n')
                fp.write(s19 + '\n')
                fp.write(s20 + '\n')
                fp.write(s21 + '\n')
                fp.write(s22 + '\n')


if __name__ == "__main__":
    csv_data_read()
