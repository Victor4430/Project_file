#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 拼多多.py
# @IDE       :PyCharm
# @Time      :2022/12/13 11:07
# @Author    :Victor
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo443.com

import os
import sys
import csv
import time
import json
import requests
from lxml import etree
from selenium import webdriver


# 装饰器 计时器
def time_out(a_func):
    def clocked(*args, **kwargs):
        start = time.time()
        result = a_func(*args, **kwargs)
        end = time.time()
        print("程序：" + a_func.__name__, "    运行时间：" + str(end - start))
        return result

    return clocked


class Selenium_Spider():
    def __init__(self):
        # 标识 当前目录
        self.path = os.getcwd()
        self.url = "https://jinbao.pinduoduo.com/promotion/single-promotion"
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

        # 去除浏览器被控  字样
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ['enable-automation'])
        options.add_experimental_option('useAutomationExtension', False)
        # 浏览器扩展程序
        # 语音识别程序
        extension_path1 = './1.2.2_0.crx'
        # xpath程序
        extension_path2 = './2.0.2_0.crx'

        options.add_extension(extension_path1)
        options.add_extension(extension_path2)

        self.driver = webdriver.Chrome(
            options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?
        # -- 防止被检测，新版本用法（2）：
        # chrome在79和79版之后用这个
        self.driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": """
            Object.defineProperty(navigator, 'webdriver', {
              get: () => undefined
            })
          """
        })
        # 浏览器窗口最大化
        self.driver.maximize_window()

        # 定义csv  写入句柄  标题栏
        headers = ['商品图片_url', '商品名称', '商品价格', '商品券后价', '商品链接', '销量', '店铺名']
        # 如果打开csv文件出现空行的情况，那么需要添加一个参数 newline=''
        self.f = open('./商品信息.csv', 'a+', newline='')
        # 创建csv操作句柄 and 写入标题
        self.f_csv = csv.DictWriter(self.f, headers)
        # 调用 writerheader() 写入表头
        self.f_csv.writeheader()
        # 通过句柄写入内容

    # 人工登陆一次获取cookies
    def obtain_cookies(self):
        self.driver.get(self.url)
        # 程序打开网页后20秒内手动登陆账户
        time.sleep(50)
        cookies = self.driver.get_cookies()
        print(cookies)
        # 写入cookies  保存本地cookies.txt
        with open('cookies.txt', 'w') as f:
            # 将cookies保存为json格式
            f.write(json.dumps(cookies))
        # 关闭浏览器
        self.driver.close()
        print('cookies  已保存！')

    # 载入本地保存的cookies
    def get_dookies(self):
        # 首先清除由于浏览器打开已有的cookies
        self.driver.delete_all_cookies()
        # 写入cookie
        with open('./cookies.txt', 'r') as f:
            # 使用json读取cookies 注意读取的是文件 所以用load而不是loads
            cookies_list = json.load(f)
            # print(cookies-list)
            for cookie in cookies_list:
                # 控制台输出cookies信息
                print(cookie)
                if 'sameSite' in cookie:
                    del cookie['sameSite']
                self.driver.add_cookie(cookie)

    @time_out
    def run_response(self):
        dict_list = {}
        # 设置会话
        session = requests.session()
        # 设置代理端口
        proxy = '127.0.0.1:4780'
        proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
        # 设置请求头
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"}
        # 开始请求网页
        self.driver.get(self.url)
        # 载入本地cookies
        self.get_dookies()
        # 刷新网页
        self.driver.refresh()
        # 隐式等待20秒  等待页面加载完成
        self.driver.implicitly_wait(20)
        # 页面源码
        page = self.driver.page_source
        # 控制台输出页面源码
        # print('页面==========>', page)

        # 开始模拟点击
        # 关闭推广活动弹窗
        self.driver.find_element_by_xpath('/html/body/div[3]/div/div/div[1]').click()
        # 点击我要推广
        self.driver.find_element_by_xpath('//*[@id="__next"]/div[1]/section/div/ul/li[1]').click()
        # 点击商品推广
        self.driver.find_element_by_xpath('//*[@id="__next"]/div[1]/section/div/ul/li[1]/div/ul/div[1]/a').click()
        # 点击价格   递增顺序  第一次点击为递减  是高价
        # self.driver.find_element_by_xpath('//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[2]/ul/div[3]/li').click()
        # 隐式等待页面加载完成
        self.driver.implicitly_wait(20)
        # 点击价格   递增顺序  第二次点击为递增  为低价
        time.sleep(1)
        # self.driver.find_element_by_xpath('//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[2]/ul/div[3]/li').click()
        time.sleep(1)
        # self.driver.find_element_by_xpath('//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[2]/ul/div[3]/li').click()
        a = 0

        for j in range(1000):
            # 启动函数 依次点击推广
            self.net_page(a, dict_list)

        # 解析网页
        # html = etree.HTML(req.text)
        # test = html.xpath('//*[@id="su"]/@value')[0]
        # print(test, '访问成功！')

        # ip测试_显示当前ip地址
        ip_url = 'http://icanhazip.com'
        ip_req = session.get(ip_url, headers=headers, proxies=proxies)
        print('当前ip：', ip_req.text)

    def net_page(self, a, dict_list):
        for i in range(1, 61):  # 59

            print('第 {}  条....................'.format(i))
            # 定时下拉浏览器滚动条
            if int(i) % 5 == 0:
                # 下拉滚动条到底
                self.driver.execute_script("window.scrollTo(0,{})".format(a + 400))
            # 销量
            xiaoliang = self.driver.find_element_by_xpath(
                '//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[3]/div[1]/div/a[' + str(i)
                + ']/div/div[2]/div[2]/div[3]/div[1]').get_attribute(
                'textContent')
            print('销量: ', xiaoliang)

            # 店铺名
            dian_name = self.driver.find_element_by_xpath(
                '//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[3]/div[1]/div/a[' + str(i)
                + ']/div/div[2]/div[2]/div[3]/div[2]').get_attribute(
                'textContent')
            print('店铺名: ', dian_name)


            # 点击立即推广
            self.driver.find_element_by_xpath(
                '//*[@id="__next"]/div[1]/main/div[1]/div[5]/div[3]/div[1]/div/a[' + str(i)
                + ']/div/div[2]/div[2]/div[4]').click()
            time.sleep(1)
            # 点击确定
            # self.driver.find_element_by_xpath('/html/body/div[3]/div/div/div[3]/div[2]/button[1]').click()
            self.driver.find_element_by_css_selector('body > div.MDL_outerWrapper_1xw01vg.MDL_modal_1xw01vg.MDL_showCloseIcon_1xw01vg > div > div > div.MDL_bottom_1xw01vg > div.MDL_footer_1xw01vg > button.BTN_outerWrapper_1xw01vg.BTN_danger_1xw01vg.BTN_medium_1xw01vg.BTN_outerWrapperBtn_1xw01vg').click()
            time.sleep(0.5)
            # 隐式等待页面加载完成
            self.driver.implicitly_wait(20)
            # 点击长链接
            # self.driver.find_element_by_xpath('/html/body/div[3]/div/div/div[2]/div/div[2]/div[1]/div/div/div[3]/div').click()
            self.driver.find_element_by_css_selector('body > div.MDL_outerWrapper_1xw01vg.MDL_modal_1xw01vg.MDL_showCloseIcon_1xw01vg > div > div > div.MDL_body_1xw01vg > div > div:nth-child(2) > div.TAB_topWrapper_1xw01vg.TAB_top_1xw01vg > div > div > div.TAB_capsule_1xw01vg.TAB_tabItem_1xw01vg.TAB_active_1xw01vg.TAB_transition_1xw01vg.TAB_top_1xw01vg.TAB_horizontal_1xw01vg').click()

            time.sleep(0.5)

            try:
                # 图片链接
                img_url = self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/img').get_attribute("src")
                print('商品图片_url： ', img_url)
                # 商品名称
                shop_name = self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/p[1]').get_attribute(
                    'textContent')
                print('商品名称: ', shop_name)
                # 商品价格
                shop_jiage = self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/p[2]').get_attribute(
                    'textContent')
                print('商品价格: ', shop_jiage)
                # 商品券后价
                shop_quanhoujia = self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/p[3]').get_attribute(
                    'textContent')
                print('商品券后价: ', shop_quanhoujia)
                # 商品链接
                shop_url = self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/p[4]').get_attribute(
                    'textContent')
                print('商品链接: ', shop_url)
                dict_list['商品图片_url'] = img_url
                dict_list['商品名称'] = shop_name
                dict_list['商品价格'] = shop_jiage
                dict_list['商品券后价'] = shop_quanhoujia
                dict_list['商品链接'] = shop_url
                dict_list['销量'] = xiaoliang
                dict_list['店铺名'] = dian_name
                # 启用csv写入数据    字典格式
                # 隐式等待页面加载完成
                self.driver.implicitly_wait(20)
                # 点击取消
                self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[2]/button[2]/span').click()
                time.sleep(0.5)

                self.csv_data_save_2(dict_list)
                # print(dict_list)

            except:
                # 隐式等待页面加载完成
                self.driver.implicitly_wait(20)
                # 点击取消
                self.driver.find_element_by_xpath(
                    '/html/body/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[2]/button[2]/span').click()
                time.sleep(0.5)

                print("本次循环  字段不完整   已自动跳过..........  第  {}  条数据！".format(i))
                continue

        # 点击下一页
        self.driver.find_element_by_css_selector(
            '#__next > div.jsx-3954532995.container > main > div:nth-child(1) > div.single-promotion-wrapper > div.single-promotion-list-wrapper > div.single-promotion-list > div > div.single-promotion-pagination > ul > li.PGT_next_1xw01vg > i').click()
        # self.net_page(a, dict_list)

    # csv 保存_使用字典方法
    def csv_data_save_2(self, dict_txt):
        # 写入字典序列类型数据的时候，需要传入两个参数，
        # 一个是文件对象——f，
        # 一个是字段名称——fieldnames，
        # 到时候要写入表头的时候，只需要调用writerheader方法，
        # 写入一行字典系列数据调用writerrow方法，并传入相应字典参数，写入多行调用writerows

        # 内容_字典（序列）方式
        rows = [dict_txt, ]
        self.f_csv.writerows(rows)
        # print(rows, '写入成功！')

        # 来不及关闭写入会报错
        # self.f.close()

    # csv 读取_方法
    def csv_data_read(self):
        # 读取csv时需要使用reader，并传如一个文件对象，而且reader返回的是一个可迭代的对象，需要使用for循环遍历
        # 在上面，row是一个列表，如果想要查看固定的某列，则需要加上下标，例如我想要查看name，那么只需要改为row[1]
        with open('./test.csv') as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                print(row)
                print(type(row))
                print(row[1])
                print(type(row[1]))

    def main(self):
        self.run_response()
        # self.req_response()
        # 手动获取cookies
        # self.obtain_cookies()

        # 程序结束关闭selenium窗口
        # self.driver.close()


if __name__ == "__main__":
    run = Selenium_Spider()
    run.main()
