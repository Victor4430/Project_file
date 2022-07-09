#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 网页js注入_抢单.py
# @IDE       :PyCharm
# @Time      :2022/4/25 16:30
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
import os

# 请求方法
def run(driver, url):
    driver.get(url)
    # 下拉滚动条到底
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(1)

    # 模拟人工操作点击F12

    builder = ActionChains(driver)
    builder.key_down(Keys.F12).perform()
    time.sleep(1)



    # 注入js
    # js_code = 'document.getElementById("g-recaptcha-response").innerHTML="{}";'.format(aaa)
    js = '''var i = 0;
   setInterval(res => {
    if (eqTime == time) {
     if (i > 3) {
      return
     }
     i++;
     buy_main_submit();
    }
   }, 50)'''
    print(js)
    driver.execute_script(js)


    # driver.quit()


if __name__ == "__main__":
    path = os.getcwd()
    url = "http://www.yueyigou.com/wdk?action=ecw.page&method=display&site_id=zhaoqing&inclient=&page_id=page_buy&iscartin=1&cartnoselect="
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}

    # 去除浏览器被控  字样
    options = webdriver.ChromeOptions()

    # 开启开发者工具（F12）
    options.add_argument("--auto-open-devtools-for-tabs")

    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)





    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?
    # driver.maximize_window()

    # 开始执行函数
    run(driver, url)
