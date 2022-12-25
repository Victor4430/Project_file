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
import time
import fake_useragent
import json



def run():
    # 实例化 user-agent 对象    得到随机user-agent
    ua = fake_useragent.UserAgent()

    url = 'https://github.com/Victor4430/Victor4430.github.io/tree/main/music/music'
    print('正在打开页面：', url)

    # 使用随机ua
    headers = ua.random
    # 使用固定ua
    # headers = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"

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
    # 首先清除由于浏览器打开已有的cookies
    driver.delete_all_cookies()
    # 写入cookie
    try:
        with open('cookies.txt', 'r') as cookief:
            # 使用json读取cookies 注意读取的是文件 所以用load而不是loads
            cookieslist = json.load(cookief)
            # print(cookieslist)
            for cookie in cookieslist:
                print(cookie)
                driver.add_cookie(cookie)
        print('000000000000000000000000000000000')
    except:
        print("已进入循环删除  步骤！")
        # 计数
        a = 0
        # 循环900次 删除文件900个
        for i in range(900):
            #  写入cookie之后刷新网页
            driver.refresh()
            # 隐式等待20秒   待页面加载完成
            driver.implicitly_wait(20)
            # 点击文件
            driver.find_element_by_xpath('//*[@id="repo-content-pjax-container"]/div/div/div[3]/div[3]/div/div[3]/div[2]/span/a').click()
            # 隐式等待20秒   待页面加载完成
            driver.implicitly_wait(20)
            # 点击删除按钮
            driver.find_element_by_xpath('//*[@id="repo-content-turbo-frame"]/div/div/div[4]/div[1]/div[2]/div[2]/form/button').click()
            # 隐式等待20秒   待页面加载完成
            driver.implicitly_wait(20)
            # 点击确定删除
            driver.find_element_by_xpath(
                '//*[@id="repo-content-pjax-container"]/div/div/div[4]/div[1]/div[2]/div[2]/form/button').click()
            # 隐式等待20秒   待页面加载完成
            driver.implicitly_wait(20)
            # 重新进入文件目录
            driver.get(url)

            a += 1
            # 打印日志
            print("已删除:",a,' 个文件！')

        print("已经删除900个文件，20秒后退出！！！！！！！11")
        # 时间停顿20秒
        time.sleep(20)
        # 退出本次浏览器自动化操作
        driver.close()




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