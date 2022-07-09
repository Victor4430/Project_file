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
import json
from selenium.webdriver.common.action_chains import ActionChains





def run():
    # 实例化 user-agent 对象    得到随机user-agent
    ua = fake_useragent.UserAgent()

    url = 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E5%8C%97%E4%BA%AC%E5%8C%97,VAP&ts=%E5%B9%BF%E5%B7%9E%E5%8D%97,IZQ&date=2022-05-12&flag=N,N,Y'
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
    # extension_path2 = './2.0.2_0.crx'

    # 添加扩展程序到浏览器
    # options.add_extension(extension_path1)
    # options.add_extension(extension_path2)

    # 添加随机ua到浏览器
    # options.add_argument('user-agent=' + ua.random)
    # 添加固定ua到浏览器
    options.add_argument('user-agent=' + headers)
    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?

    # 浏览器窗口最大化
    # driver.maximize_window()

    # 开始请求
    driver.get(url)
    driver.implicitly_wait(10)  # 隐式等待时间 单位 秒/s  等待网页加载完成
    # 点击确定
    driver.find_elements_by_xpath('/html/body/div[2]/div[49]/div[2]/div[2]/div[2]/a')[0].click()
    # 点击登陆
    # driver.find_elements_by_xpath('/html/body/div[2]/div[2]/div[1]/div/div/ul/li[7]/a[1]')[0].click()
    # driver.implicitly_wait(20)

    # 首先清除由于浏览器打开已有的cookies
    driver.delete_all_cookies()

    with open('./cookies.txt', 'r') as cookief:
        # 使用json读取cookies 注意读取的是文件 所以用load而不是loads
        cookieslist = json.load(cookief)
        # print(cookieslist)
        for cookie in cookieslist:
            print(cookie)
            if 'sameSite' in cookie:
                del cookie['sameSite']
            driver.add_cookie(cookie)

    # #点击输入框
    # inp = driver.find_elements_by_xpath('/html/body/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input')[0]
    # inp.click()
    # inp.send_keys('18072567851')
    # # 输入密码
    # pwd = driver.find_elements_by_xpath('/html/body/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/input')[0]
    # pwd.click()
    # pwd.send_keys('LZj9872511')
    # # 点击确定
    # driver.find_elements_by_xpath('/html/body/div[1]/div[2]/div[2]/div[1]/div[1]/div[4]/a')[0].click()

    # -----------------------------------滑块验证--------------------------------------------
    # 拖动滑块
    # dragger = driver.find_element_by_id("nc_1_n1z")
    # action = ActionChains(driver)
    # action.click_and_hold(dragger).perform()  # 点击并拖住滑块
    # action.drag_and_drop_by_offset(dragger, 300, 0).perform()  # 拖动等长距离滑块，开发者模式可看到
    # time.sleep(2)
    # driver.find_element_by_xpath("//div[@class='modal-ft']/a").click()  # 点掉提示
    driver.refresh()
    # 点击确定
    driver.find_elements_by_xpath('/html/body/div[2]/div[49]/div[2]/div[2]/div[2]/a')[0].click()

    # a = input('手动暂停......扫码登陆.........')

    # 点击确定
    # driver.find_elements_by_xpath('/html/body/div[2]/div[7]/div[2]/div[3]/a')[0].click()
    js = 'window.open("https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E5%8C%97%E4%BA%AC%E5%8C%97,VAP&ts=%E5%B9%BF%E5%B7%9E%E5%8D%97,IZQ&date=2022-05-12&flag=N,N,Y");'

    driver.execute_script(js)


    n = driver.window_handles  # 这个时候会生成一个新窗口或新标签页的句柄，代表这个窗口的模拟driver
    print('当前句柄: ', n)  # 会打印所有的句柄
    driver.switch_to.window(n[-1])  # driver切换至最新生产的页面
    # 点击确定
    driver.find_elements_by_xpath('/html/body/div[2]/div[49]/div[2]/div[2]/div[2]/a')[0].click()


    # pagesource  开始解析页面内容
    text = driver.page_source
    print(text)
    html = etree.HTML(text)

    content = html.xpath('//*[@id="float"]')
    print("content:",content)
    print(type(content))
    for i in content:
        print(i.xpath('//*[@id="ZE_2400000G650W"]'))
        b = input('人工等待...................')


# 程序入口
if __name__ == '__main__':
    # 开始执行函数
    run()
    # url_get()
