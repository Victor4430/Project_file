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
# @FileName  :py_venv -> pip 一次性安装很多库.py
# @IDE       :PyCharm
# @Time      :2022/5/9 17:15
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

import os


def auto_install_idle():
    '''
    print()输出内容   为默认颜色
    :return:
    '''
    libs = ['requests', 'asyncio', 'bs4', 'beautifulsoup4', 'docopt', 'docx', 'django', 'flask', 'werobot', 'wheel',
            'lxml', 'xlwt',
            'numpy', 'networkx', 'sklearn', 'Scikit-Learn', 'Keras', 'Scapy', 'scrapy', 'SciPy',
            'selenium', 'sympy', 'matplotlib', 'multiprocessing', 'threading', 'jieba', 'jsonpath', 'pandas', 'Pillow',
            'playwright', 'pdfplumber',
            'pypdf2', 'pyautogui', 'pyperclip', 'Pyglet', 'pymysql', 'pyqt5', 'pywifi', 'pyopengl', 'pygame',
            'pyinstaller', 'pymongo', 'uvloop', 'aioredis', 'aiomysql', 'aiohttp', 'TensorFlow']
    # 计数器
    num = 0
    # 需要安装的库的数量
    a = len(libs)
    # 统计出错次数
    c = 0
    for lib in libs:
        # 已执行数量
        num += 1
        # 剩余未执行数量
        b = a - num

        try:
            print('当前安装第 ', num, ' 个库，剩余：', b, ' 个库正在等待安装....' )
            print('开始安装： ', lib )
            print("执行命令：  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple " + lib )
            os.system('pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ')
            print(lib + '：' + '  installed successful 已安装成功！')
        except:
            # 出错次数累计
            c += 1
            print(lib + '  installed failed      安装失败！')

    print(libs, '\n', "已成功安装", num, "个库！", c, "个异常！   \n程序退出！")


def auto_install_pycharm():
    '''
    改变 print() 输出内容的颜色
    :return:
    '''
    # print 字体紫色
    color_a = "\033[1;35m"
    color_b = '\033[0m'
    # color_a +
    # + color_b

    libs = ['requests', 'asyncio', 'bs4', 'beautifulsoup4', 'docopt', 'docx', 'django', 'flask', 'werobot', 'wheel',
            'lxml', 'xlwt',
            'numpy', 'networkx', 'sklearn', 'Scikit-Learn', 'Keras', 'Scapy', 'scrapy', 'SciPy',
            'selenium', 'sympy', 'matplotlib', 'multiprocessing', 'threading', 'jieba', 'jsonpath', 'pandas', 'Pillow',
            'playwright', 'pdfplumber',
            'pypdf2', 'pyautogui', 'pyperclip', 'Pyglet', 'pymysql', 'pyqt5', 'pywifi', 'pyopengl', 'pygame',
            'pyinstaller', 'pymongo', 'uvloop', 'aioredis', 'aiomysql', 'aiohttp', 'TensorFlow']
    # 计数器
    num = 0
    # 需要安装的库的数量
    a = len(libs)
    # 统计出错次数
    c = 0
    for lib in libs:
        # 已执行数量
        num += 1
        # 剩余未执行数量
        b = a - num

        try:
            print(color_a + '当前安装第 ', num, ' 个库，剩余：', b, ' 个库正在等待安装....' + color_b)
            print(color_a + '开始安装： ', lib + color_b)
            print(color_a + "执行命令：  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple " + lib + color_b)
            os.system('pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ' + lib)
            print(color_a + lib + '：' + '  installed successful 已安装成功！' + color_b)
        except:
            # 出错次数累计
            c += 1
            print("\033[1;31m" + lib + '  installed failed      安装失败！' + color_b)

    print(color_a + str(libs), '\n', "已成功安装", num, "个库！", c, "个异常！   \n程序退出！" + color_b)


if __name__ == '__main__':
    auto_install_pycharm()
