#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> Internet_版.py
# @IDE       :PyCharm
# @Time      :2022/5/7 15:41
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import csv
import requests
from lxml import etree


def run():
    # 设置开始网址
    url = "https://www.baidu.com"
    # 设置代理端口
    proxy = '127.0.0.1:4780'
    proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
    # 设置请求头
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"}
    # 开始请求网页
    req = requests.get(url, headers=headers, proxies=proxies)
    req.encoding = 'utf-8'
    print(req.text)

    # 解析网页
    html = etree.HTML(req.text)
    test = html.xpath('//*[@id="su"]/@value')[0]
    print(test, '访问成功！')

    # ip测试_显示当前ip地址
    ip_url = 'http://icanhazip.com'
    ip_req = requests.get(ip_url, headers=headers, proxies=proxies)
    print('当前ip：', ip_req.text)


# -*- coding:UTF-8 -*-
# 综合改进版本

import time
from datetime import date, timedelta
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
import platform
import read
import os

TB_LOGIN_URL = 'https://login.taobao.com/member/login.jhtml'
SELECT_URL = 'https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm'


class Login:

    def __init__(self, account, password):
        self.browser = None
        self.account = account
        self.password = password

    def open(self, url):
        self.browser.get(url)
        self.browser.implicitly_wait(20)

    def start(self):
        # 1 初始化浏览器
        self.init_browser()
        # 2 打开淘宝登录页
        self.browser.get(TB_LOGIN_URL)
        time.sleep(1)
        # 3 输入用户名
        self.write_username(self.account)
        time.sleep(1.5)
        # 4 输入密码
        self.write_password(self.password)
        time.sleep(1.5)
        # 5 如果有滑块 移动滑块
        if self.lock_exist():
            self.unlock()
        # 6 点击登录按钮
        self.submit()
        # 7 登录成功，直接请求页面
        print("登录成功，跳转至目标页面进行处理")
        # 这里可以写一些登录后需要python处理的逻辑
        # self.browser.get('https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm')
        print("over")
        time.sleep(5000)

    def switch_to_password_mode(self):
        """
        切换到密码模式
        :return:
        """
        if self.browser.find_element_by_id('J_QRCodeLogin').is_displayed():
            self.browser.find_element_by_id('J_Quick2Static').click()

    def write_username(self, username):
        """
        输入账号
        :param username:
        :return:
        """
        try:
            username_input_element = self.browser.find_element_by_id('fm-login-id')
        except:
            username_input_element = self.browser.find_element_by_id('TPL_username_1')

        username_input_element.clear()
        username_input_element.send_keys(username)

    def write_password(self, password):
        """
        输入密码
        :param password:
        :return:
        """

        try:
            password_input_element = self.browser.find_element_by_id("fm-login-password")
        except:
            password_input_element = self.browser.find_element_by_id('TPL_password_1')

        #

        password_input_element.clear()
        password_input_element.send_keys(password)

    def lock_exist(self):
        """
        判断是否存在滑动验证
        :return:
        """
        return self.is_element_exist('#nc_1_wrapper') and self.browser.find_element_by_id(
            'nc_1_wrapper').is_displayed()

    def unlock(self):
        """
        执行滑动解锁
        :return:
        """
        if self.is_element_exist("#nocaptcha > div > span > a"):
            self.browser.find_element_by_css_selector("#nocaptcha > div > span > a").click()

        bar_element = self.browser.find_element_by_id('nc_1_n1z')
        ActionChains(self.browser).drag_and_drop_by_offset(bar_element, 258, 0).perform()
        if self.is_element_exist("#nocaptcha > div > span > a"):
            self.unlock()
        time.sleep(0.5)

    def submit(self):
        """
        提交登录
        :return:
        """
        try:
            self.browser.find_element_by_css_selector("#login-form > div.fm-btn > button").click()
        except:
            self.browser.find_element_by_id('J_SubmitStatic').click()

        time.sleep(0.5)
        if self.is_element_exist("#J_Message"):
            self.write_password(self.password)
            self.submit()
            time.sleep(5)

    def navigate_to_target_page(self):
        pass

    # def init_date(self):
    #     date_offset = 0
    #     self.today_date = (date.today() + timedelta(days=-date_offset)).strftime("%Y-%m-%d")
    #     self.yesterday_date = (date.today() + timedelta(days=-date_offset-1)).strftime("%Y-%m-%d")

    def init_browser(self):
        self.downloadPath = os.getcwd()
        CHROME_DRIVER = os.path.abspath(os.path.dirname(os.getcwd())) + os.sep + 'chromedriver' + os.sep
        if platform.system() == 'Windows':
            CHROME_DRIVER = os.getcwd() + os.sep + 'chromedriver87.0.4280.88.exe'
        if platform.system() == 'Linux':
            CHROME_DRIVER = os.getcwd() + os.sep + 'chromedriver'
        """
        初始化selenium浏览器
        :return:
        """

        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Host": "buyertrade.taobao.com",
            "Accept-Language": "zh-CN",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0",
            "Connection": "keep-alive",
            "referer": "https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm"
        }

        options = Options()
        # options.add_argument("--headless")
        # prefs = {"profile.managed_default_content_settings.images": 2}
        prefs = {"profile.managed_default_content_settings.images": 2, 'download.default_directory': self.downloadPath}
        # 1是加载图片，2是不加载图片
        options.add_experimental_option("prefs", prefs)
        options.add_argument('--proxy-server=http://127.0.0.1:9000')
        options.add_argument('disable-infobars')
        options.add_argument('--no-sandbox')
        self.browser = webdriver.Chrome(executable_path=CHROME_DRIVER, options=options)
        self.browser.implicitly_wait(3)
        self.browser.maximize_window()

    def is_element_exist(self, selector):
        """
        检查是否存在指定元素
        :param selector:
        :return:
        """
        try:
            self.browser.find_element_by_css_selector(selector)
            return True
        except NoSuchElementException:
            return False


        account = 'ranjuan.cn'
        # 输入你的账号名
        password = '密码'
        # 输入你密码
        Login(account, password).start()


if __name__ == "__main__":
    run()
