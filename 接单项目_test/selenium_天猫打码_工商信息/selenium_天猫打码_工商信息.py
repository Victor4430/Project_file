#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> selenium_天猫打码_工商信息.py
# @IDE       :PyCharm
# @Time      :2022/5/9 17:15
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import csv
import requests
from lxml import etree
from selenium import webdriver
from bs4 import BeautifulSoup
import re
import time
import fake_useragent



# 读取csv文件里面的url
def url_get():
    with open('./url/wznr.csv') as f:
        a = f.readlines()
        for i in a:
            return i


def run():
    # 实例化 user-agent 对象    得到随机user-agent
    ua = fake_useragent.UserAgent()

    url = url_get()
    print('00000000000000000000000', url)

    # 使用随机ua
    # headers = {"user-agent": ua.random}
    # 使用固定ua
    headers = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"

    # 去除浏览器被控  字样
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)

    # 浏览器扩展程序
    # cookie获取程序
    # extension_path1 = './2.1.0.0_0.crx'

    # xpath程序
    extension_path2 = './2.0.2_0.crx'

    # 添加扩展程序到浏览器
    # options.add_extension(extension_path1)
    options.add_extension(extension_path2)

    # 添加随机ua到浏览器
    # options.add_argument('user-agent=' + ua.random)
    # 添加固定ua到浏览器
    options.add_argument('user-agent=' + headers)
    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?

    # 浏览器窗口最大化
    driver.maximize_window()

    # 开始请求
    driver.get(url)
    driver.implicitly_wait(10)  # 隐式等待时间 单位 秒/s  等待网页加载完成

    time.sleep(2)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行
    a = input('手动暂停...............')
    # 点击下拉列表
    driver.find_element_by_xpath('//*[@id="block-tu-d8-content"]/div/article/div/div[3]'
                                 '/div/div/div/div[3]/div[4]/div[1]/div[2]').click()

    time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

    # 选择每页100条
    driver.find_element_by_xpath(
        '//*[@id="block-tu-d8-content"]/div/article/div/div[3]/div/div/div/div[3]/div[4]/div[1]/div[2]/div[2]/div[4]').click()

    driver.implicitly_wait(20)  # 隐式等待时间 单位 秒/s  等待网页加载完成
    time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight-2000)")
    time.sleep(2)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

    # 滑动浏览器滚动条向下滑动1000px
    driver.execute_script("window.scrollTo(0,1000)")  # 执行JavaScript代码

    time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

    try:  # 点击同意获取cookie
        driver.find_element_by_xpath('//*[@id="popup-buttons"]/button').click()
        print("已点击我同意获取cookie")
    except:
        print("没有点击...........................................")
        pass

    # 计数标识
    a = 0

    # 循环爬取3页数据
    for i in range(3):  # 若开启递归  需把range(3) 改为0  或 去除此处循环
        # 下拉滚动条
        driver.implicitly_wait(30)  # 隐式等待时间 单位 秒/s  等待网页加载完成
        driver.execute_script("window.scrollTo(1000,2000)")
        time.sleep(2)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

        # 点击下拉列表
        driver.find_element_by_xpath('//*[@id="block-tu-d8-content"]/div/article/div/div[3]'
                                     '/div/div/div/div[3]/div[4]/div[1]/div[2]').click()

        time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

        # 选择每页100条
        driver.find_element_by_xpath(
            '//*[@id="block-tu-d8-content"]/div/article/div/div[3]/div/div/div/div[3]/div[4]/div[1]/div[2]/div[2]/div[4]').click()

        driver.implicitly_wait(20)  # 隐式等待时间 单位 秒/s  等待网页加载完成
        time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight-2000)")
        time.sleep(2)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

        # pagesource  开始解析页面内容
        text = driver.page_source
        html = etree.HTML(text)

        content = html.xpath('//*[@id="ranking-data-load"]')[0]

        # 每个页面100条  循环 依次获取数据
        for j in range(1, 101):
            Rank = content.xpath('.//div[@class="row ind"][' + str(j) + ']/div/div/div/div[1]/div[1]/text()')[0]
            University = \
                content.xpath('.//div[@class="row ind"][' + str(j) + ']/div/div/div/div[2]/div/div[1]/a/text()')[0]
            Overall_Score = \
                content.xpath('.//div[@class="row ind"][' + str(j) + ']/div/div/div/div[3]/span[1]/text()')[0]
            print("Rank：", Rank)
            print("University：", University)
            print("Overall Score：", Overall_Score)
            print('**********' * 10)
            a += 1
            f_csv.writerow(
                {
                    'Rank': Rank,
                    'University': University,
                    'Overall Score': Overall_Score
                }
            )

        # js = 'document.getElementById("password").click()'  # js点击元素
        # driver.execute_scrtip(js)  # 执行js语句

        # 点击下一页
        driver.find_element_by_css_selector(
            '#alt-style-pagination > li:nth-child(8) > a').click()
        time.sleep(1)  # 网络原因 短暂停顿等待网页加载完成  网速好可删除此行

    print('已获取{}条数据！！！'.format(a))
    print("程序关闭！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！")
    driver.close()


# 递归   不想用循环翻页可以打开此处递归
# get(driver)


# csv 保存_使用数组方法
def csv_data_save_1():
    # 传入一个文件对象，然后才能在这个文件对象的基础上调用csv的写入方法writerow（写入一行）writerrow（写入多行）

    # 定义标题栏
    headers = ['class', 'name', 'sex', 'height', 'year']
    # 内容_列表（数组）方式
    rows = [
        [1, 'xiaoming', 'male', 168, 23],
        [1, 'xiaohong', 'female', 162, 22],
        [2, 'xiaozhang', 'female', 163, 21],
        [2, 'xiaoli', 'male', 158, 21]
    ]
    # 如果打开csv文件出现空行的情况，那么需要添加一个参数 newline=''
    with open('test.csv', 'w', newline='') as f:
        # 创建csv操作句柄
        f_csv = csv.writer(f)
        # 利用句柄写入标题
        f_csv.writerow(headers)
        # 通过句柄写入内容
        f_csv.writerows(rows)


# csv 保存_使用字典方法
def csv_data_save_2():
    # 写入字典序列类型数据的时候，需要传入两个参数，
    # 一个是文件对象——f，
    # 一个是字段名称——fieldnames，
    # 到时候要写入表头的时候，只需要调用writerheader方法，
    # 写入一行字典系列数据调用writerrow方法，并传入相应字典参数，写入多行调用writerows

    # 定义标题栏
    headers = ['class', 'name', 'sex', 'height', 'year']
    # 内容_字典（序列）方式
    rows = [
        {'class': 1, 'name': 'xiaoming', 'sex': 'male', 'height': 168, 'year': 23},
        {'class': 1, 'name': 'xiaohong', 'sex': 'female', 'height': 162, 'year': 22},
        {'class': 2, 'name': 'xiaozhang', 'sex': 'female', 'height': 163, 'year': 21},
        {'class': 2, 'name': 'xiaoli', 'sex': 'male', 'height': 158, 'year': 21},
    ]
    # 如果打开csv文件出现空行的情况，那么需要添加一个参数 newline=''
    with open('./test.csv', 'w', newline='') as f:
        # 创建csv操作句柄 and 写入标题
        f_csv = csv.DictWriter(f, headers)
        # 调用 writerheader() 写入表头
        f_csv.writeheader()
        # 通过句柄写入内容
        f_csv.writerows(rows)


# csv 读取_方法
def csv_data_read():
    # 读取csv时需要使用reader，并传如一个文件对象，而且reader返回的是一个可迭代的对象，需要使用for循环遍历
    # 在上面，row是一个列表，如果想要查看固定的某列，则需要加上下标，例如我想要查看name，那么只需要改为row[1]
    with open('./test.csv') as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            print(row)
            print(type(row))
            print(row[1])
            print(type(row[1]))


# 程序入口
if __name__ == '__main__':
    # 开始执行函数
    run()
    # url_get()
