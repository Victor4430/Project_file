
#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 模板.py
# @IDE       :PyCharm
# @Time      :2022/6/2 0:43
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import csv
import requests
from lxml import etree
from bs4 import BeautifulSoup
import re

# 网页样式
def get_html_0():
    # 设置代理端口
    proxy = '127.0.0.1:4780'
    proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
    # 设置请求头
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"}
    # 小说网址
    url = 'https://www.dddbiquge.cc/chapter/13397636_87179733.html'
    req = requests.get(url, headers=headers, proxies=proxies)
    req.encoding = 'gbk'
    html = req.text
    soup = BeautifulSoup(html, "html.parser")
    with open('./重生大师姐不想努力了.txt', 'a', encoding='utf-8') as fp:
        # 循环访问多少章节
        for i in range(1113):
            title = soup.find("h1")
            title_name = title.text
            print(title_name)
            content = soup.find('div', id="content").text
            pat = re.compile(r'\((.*?)\)')
            urls = re.findall(pat, content)[0]
            content = content.replace('�1�3', '').replace('天才一秒记住本站地址：www.dddbiquge.cc。顶点笔趣阁手机版阅读网址：m.dddbiquge.cc', '').replace('('+urls+')','本章完')
            print(content)
            print(urls)
            fp.write('\n'+title_name)
            fp.write('\n')
            fp.write(content)
            print('已写入: ', title_name)
            urls = soup.select('#wrapper > div.book.reader > div.content > div.page_chapter > ul > li:nth-child(3) > a')
            result = urls[0]
            print(result.get('href'))
            ping = 'https://www.dddbiquge.cc'
            urll = ping + result.get('href')
            print(urll)
            while True:
                try:
                    req = requests.get(urll, headers=headers, proxies=proxies, timeout=(200,2000))
                    req.encoding = 'gbk'
                    html = req.text
                    soup = BeautifulSoup(html, "html.parser")
                    print("请求成功")
                    break
                except:
                    print("正在重新请求 下一章url.........................................................................................")
                    req = requests.get(urll, headers=headers, proxies=proxies, timeout=(200, 2000))
                    req.encoding = 'gbk'
                    html = req.text
                    soup = BeautifulSoup(html, "html.parser")
# 阅读样式
def get_html_1():
    # 设置代理端口
    proxy = '127.0.0.1:4780'
    proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
    # 设置请求头
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"}
    # 小说网址
    url = 'https://www.qu-la.com/booktxt/12088394116/55665370116.html'
    req = requests.get(url, headers=headers, proxies=proxies)
    req.encoding = 'gbk'
    html = req.text
    soup = BeautifulSoup(html, "html.parser")
    with open('./狂凤重生白歌月容九.txt', 'a', encoding='utf-8') as fp:
        for i in range(1113):
            title = soup.find("h1")
            title_name = title.text
            print(title_name)
            content = soup.find('div', id="txt").text

            content = content.replace('『如果章节错误，点此举报』', '').replace('天才一秒记住本站地址：www.dddbiquge.cc。顶点笔趣阁手机版阅读网址：m.dddbiquge.cc', '')
            print(content)
            fp.write('\n'+title_name)
            fp.write('\n')
            fp.write(content)
            print('已写入: ', title_name)
            urls = soup.find('a', id="pb_next").get('href')
            print(urls)
            ping = 'https://www.qu-la.com'
            urll = ping + urls
            print(urll)
            while True:
                try:
                    req = requests.get(urll, headers=headers, proxies=proxies, timeout=(200,2000))
                    req.encoding = 'gbk'
                    html = req.text
                    soup = BeautifulSoup(html, "html.parser")
                    print("请求成功")
                    break
                except:
                    print("正在重新请求 下一章url.........................................................................................")
                    req = requests.get(urll, headers=headers, proxies=proxies, timeout=(200, 2000))
                    req.encoding = 'gbk'
                    html = req.text
                    soup = BeautifulSoup(html, "html.parser")

if __name__ == '__main__':
    get_html_1()
