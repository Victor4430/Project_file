
"""
    Project University Ranking

        In order to research for exchange information,studentsalways need to search for the university ranking from multiplesources.
    I propose to make a web crawler to crawl top 200 universities from each sources.

    Website:
    QS ranking: https://www.topuniversities.com/

    Data manipulation
      1.Integrate all the data into one file
      2.Data cleansing:
        Organize all information from different website intounified format:
            University Name
            Ranking
            Location(city&country)
            Source

    The crawled data for the website will be cleaned and submitted in csv format.


    程序调试环境：
         Google Chrome：  版本 96.0.4664.45（正式版本） （64 位）
           python解释器：  使用 anaconda3
    chromedriver_win32：  96.0.4664.45/2021-11-16T09:35:54.118Z  测试时位于 anaconda3 根目录


"""

from selenium import webdriver
from lxml import etree
from bs4 import BeautifulSoup
import re
import time
import csv
import fake_useragent


# 请求方法
def get(driver, url):
    FileName = './QS排名.csv'
    with open(FileName, "a", newline='', encoding='utf-8') as f:
        print(FileName, "   文件已创建...")
        fieldnames = ["Rank", "University", "Overall Score"]
        f_csv = csv.DictWriter(f, fieldnames=fieldnames)
        f_csv.writeheader()

        # 开始请求
        driver.get(url)
        driver.implicitly_wait(10)  # 隐式等待时间 单位 秒/s  等待网页加载完成

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
                University = content.xpath('.//div[@class="row ind"][' + str(j) + ']/div/div/div/div[2]/div/div[1]/a/text()')[0]
                Overall_Score = content.xpath('.//div[@class="row ind"][' + str(j) + ']/div/div/div/div[3]/span[1]/text()')[0]
                print("Rank：", Rank)
                print("University：", University)
                print("Overall Score：", Overall_Score)
                print('**********'*10)
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




# 程序入口
if __name__ == '__main__':

    # 实例化 user-agent 对象    得到随机user-agent
    ua = fake_useragent.UserAgent()

    url = "https://www.topuniversities.com/university-rankings/world-university-rankings/2022"
    # 不用vpn将如下跳转中文网  网页排版略有不同
    # url = "https://www.qschina.cn/university-rankings/world-university-rankings/2022"

    # 使用随机ua
    headers = {"user-agent": ua.random}

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
    options.add_argument('user-agent=' + ua.random)
    driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?

    # 浏览器窗口最大化
    driver.maximize_window()

    # 开始执行函数
    get(driver, url)
