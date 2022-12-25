#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 刷访问量.py
# @IDE       :PyCharm
# @Time      :2022/11/23 14:39
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

from selenium import webdriver
import os


# 请求方法
def get(driver, url):
    driver.get(url)
    while True:
        driver.find_element_by_xpath('//*[@id="time_new"]').click()
        # 隐式等待
        driver.implicitly_wait(30)


# 程序入口
if __name__ == '__main__':
    # 标识 当前目录
    path = os.getcwd()
    url = "https://demo443.com"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}

    # 去除浏览器被控  字样
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)

    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?
    # driver.maximize_window()

    get(driver, url)
