#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 滑动验证码.py
# @IDE       :PyCharm
# @Time      :2022/5/7 15:14
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com


from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver import ChromeOptions, ActionChains
import os,sys
import time


def run(driver):

    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
                    Object.defineProperty(navigator, 'webdriver', {
                      get: () => undefined
                    })
                  """
    })

    driver.find_element_by_xpath('//*[@id="fm-login-id"]').send_keys('15111849434')
    driver.find_element_by_xpath('//*[@id="fm-login-password"]').send_keys('aoyunyang123.')
    driver.find_element_by_xpath('//*[@id="login-form"]/div[4]/button').click()
    time.sleep(5)
    driver.find_element_by_xpath('//*[@id="nc_1_n1z"]').click()
    print("已点击..........")


if __name__ == "__main__":
    # 标识 当前目录
    path = os.getcwd()
    url = "https://detail.tmall.com/item.htm?id=627106277708&ns=1&abbucket=13"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    prefs = {
        'profile.default_content_setting_values': {
            'images': 2,
        }
    }
    # 去除浏览器被控  字样
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_experimental_option('prefs', prefs)
    options.add_argument('--disable-blink-features=AutomationControlled')

    # 浏览器扩展程序
    # 语音识别程序
    # extension_path1 = './1.2.2_0.crx'
    # # xpath程序
    # extension_path2 = './2.0.2_0.crx'

    # options.add_extension(extension_path1)
    # options.add_extension(extension_path2)
    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?

    driver.get(url)
    # driver.maximize_window()
    run(driver)
