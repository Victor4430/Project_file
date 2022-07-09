#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :music_rename.py
# @Time      :2022/1/23 13:59
# @Author    :杨晓东
# @email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

import requests
import time
from lxml import etree



def run():
    proxy = '127.0.0.1:4780'
    proxies = {
        'http': 'http://' + proxy,
        'https': 'http://' + proxy
    }
    # url = 'https://jx.parwix.com:4433/player/?url='
    headers = {"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36"}
    # ship = str(input("请输入视频链接： "))
    # urls = url + ship
    urls = 'https://jx.parwix.com:4433/player/?url=https://www.iqiyi.com/v_1byls8f3pw8.html?vfrm=pcw_home&vfrmblk=712211_dianshiju&vfrmrst=712211_dianshiju_image8&r_area=&r_source=&bkt=&e='
    print("开始解析url：",urls)
    req = requests.get(urls,headers=headers,proxies=proxies)
    print(req.text)
    html = etree.HTML(req.text)
    video = html.xpath(('//*[@id="video"]/@src'))
    print("video_url：",video)


if __name__ == "__main__":
    run()
