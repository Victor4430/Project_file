#!/usr/bin/env python
# -*- coding:utf-8 -*-

import scrapy


class XotxtSpider(scrapy.Spider):
    name = 'xotxt'
    allowed_domains = ['yazhouse8.com']
    start_urls = ['https://yazhouse8.com/2jXJj.htm']

    def parse(self, response):
        print('爬虫开始..............')
        content_url = response.xpth('/html/body/div[1]/div/div/p/a/@href')
        print(content_url)

    def parse2(self, response):
        pass
