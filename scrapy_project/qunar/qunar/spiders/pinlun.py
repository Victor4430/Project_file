#!/usr/bin/env/python
# -*- coding: UTF-8 -*-
import scrapy
import time
import io
import sys
import re
import json

# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')

class PinlunSpider(scrapy.Spider):
    name = 'pinlun'
    allowed_domains = ['hotel.qunar.com']
    start_urls = ['https://hotel.qunar.com/cn/xiamen/s00key55378843?fromDate=2022-03-22&toDate=2022-03-23']

    def parse(self, response):
        print('爬虫开始运行....')
        # time.sleep(5)
        # aurl = response.xpath('//*[@id="hotel_lst_body"]/li/div/div[3]/p[1]/a/@href')
        aurl = response.text

        print('00000000000000000000',aurl)
        res = re.findall('<script>window.INITIAL_STATE=(.*?);</script>', aurl)
        #
        print('55555555555',res)
        print(type(res))
        jsonArr = json.dumps(res, ensure_ascii=False)
        a = jsonArr.replace("\\","").replace("'","")
        print('jsonArr',a)
        print(a[0])
        print(type(a))



        # aaurl = scrapy.Request(response.urljoin(aurl))
        # print('11111111111111111111',aaurl)