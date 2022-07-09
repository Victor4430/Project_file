#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 亚马逊_所有商品信息.py
# @IDE       :PyCharm
# @Time      :2022/4/11 20:07
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import requests


def getHTMLText(url):
    try:
        proxy = '127.0.0.1:4780'
        proxies = {
            'http': 'http://' + proxy,
            'https': 'http://' + proxy
        }

        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'}
        r = requests.get(url, headers=headers, proxies=proxies, timeout=30)
        r.raise_for_status()  # 如果状态不是200，引发HTTPError异常
        r.encoding = r.apparent_encoding
        return r.text
    except:
        return "产生异常"


if __name__ == "__main__":
    url = "https://www.amazon.com/Guide-Project-Management-Knowledge-PMBOK%C2%AE/dp/1628256648/ref=sr_1_17?pd_rd_r=96f61e59-aba8-4ae2-9ea0-d08e63b5480f&pd_rd_w=M2uQ0&pd_rd_wg=9H1az&pf_rd_p=f5c158e1-98f7-4998-94b8-d7306c066086&pf_rd_r=X9EA5ZX2ZNJRBT47T61H&qid=1650015364&refinements=p_72%3A1250221011&s=books&sr=1-17"
    print(getHTMLText(url))

