"""
pip一次性安装很多库

1、问题描述：有时候我们想要安装许多python库来进行work，但一条条安装过于麻烦，所以想一次性安装所需的所有库。

2、问题解决：首先将自己所需的库放在一个requirement.txt文件中，然后通过参数-r来安装文件里所列出的所有库。示例如下：

pip install -r requirement.txt

1、   如果安装的比较慢，可以换安装源，需要参数-i，示例如下：

    pip install -i https://pypi.douban.com/simple -r requirement.txt
        or
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirement.txt
        or
    pip install -i https://mirrors.aliyun.com/pypi/simple -r requirement.txt

requirement.txt

asyncio
bs4
beautifulsoup4
docopt
docx
django
flask
werobot
wheel
requests
lxml
xlwt
numpy
networkx
sklearn
Scikit-Learn
TensorFlow
Keras
Scapy
scrapy
SciPy
selenium
sympy
matplotlib
multiprocessing
threading
jieba
jsonpath
pandas
Pillow
playwright
pdfplumber
pypdf2
pyautogui
pyperclip
Pyglet
pymysql
pyqt5
pywifi
pyopengl
pygame
pyinstaller
pymongo

"""
# !/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 多线程安装常用库.py
# @IDE       :PyCharm
# @Time      :2022/5/9 17:15
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

import os
import threading


def thread_pip(pip_name):
    os.system('pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ' + pip_name)
    print('pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ' + pip_name)



if __name__ == '__main__':
    libs = ['pyquery', 'asyncio', 'python-utils', 'aiohttp', 'aiofiles', 'aiomysql', 'aioredis', 'requests', 'bs4',
            'beautifulsoup4', 'docopt',
            'docx', 'django', 'flask', 'werobot', 'wheel',
            'lxml', 'xlwt',
            'numpy', 'networkx', 'sklearn', 'Scikit-Learn', 'Keras', 'Scapy', 'scrapy', 'SciPy',
            'selenium', 'sympy', 'matplotlib', 'multiprocessing', 'threading', 'jieba', 'jsonpath', 'pandas', 'Pillow',
            'playwright', 'pdfplumber',
            'pypdf2', 'pyautogui', 'pyperclip', 'Pyglet', 'pymysql', 'pyqt5', 'pywifi', 'pyopengl', 'pygame',
            'pyinstaller', 'pymongo', 'uvloop', 'TensorFlow']

    threads = []
    for i in libs:  # 循环创建多个个线程
        t = threading.Thread(target=thread_pip, args=(i,))
        threads.append(t)
        t.setDaemon(True)  # 给每个子线程添加守护线程
    for t in threads:  # 循环启动创建的线程
        t.start()
    for t in threads:
        t.join(2)  # 设置子线程超时2秒

    print("thread end")
