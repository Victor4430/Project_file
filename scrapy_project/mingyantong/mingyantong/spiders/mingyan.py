#!/usr/bin/env python
# -*- coding:utf-8 -*-
import scrapy


class MingyanSpider(scrapy.Spider):
    name = 'mingyan'
    allowed_domains = ['mingyantong.com']
    start_urls = ['https://www.mingyantong.com/allarticle/jingdiantaici']

    def parse(self, response, page=0):
        page += 1
        print("爬虫开始......")
        # print(response.text.replace('\u200b', '').replace('\xa9', ''))
        urls = response.xpath(
            '//*[@id="block-views-xqtermspagearticletype-block_1"]/div/div/div/div/div[2]/div/div[2]/span/a/@href').extract()
        names = response.xpath(
            '//*[@id="block-views-xqtermspagearticletype-block_1"]/div/div/div/div/div[2]/div/div[2]/span/a/text()').extract()
        z = zip(urls, names)
        s = 0
        for i, j in z:
            s += 1
            url = response.urljoin(i)
            print('第%d页 第%d条  第一次解析的url：' % (page, s), j, url)
            yield scrapy.Request(url, callback=self.one_url,meta={'name' : j})
        next_url = response.xpath(
            '//*[@id="block-views-xqtermspagearticletype-block_1"]/div/div/div/div/div[3]/ul/li[7]/a/@href').extract_first()
        # yield scrapy.Request(response.urljoin(next_url), callback=self.parse)

    def one_url(self, response):
        print("第二次解析开始........")
        name = response.meta['name']
        print('name=====',name)
        content = response.xpath(
            '//*[@id="block-views-xqarticletermspage-block_1"]/div/div/div/div/div[2]/div/div/div[1]/a/text()').extract()
        # content = "".join(content.split())
        ren = response.xpath(
            '//*[@id="block-views-xqarticletermspage-block_1"]/div/div/div/div/div[2]/div/div/div[2]//text()').extract()
        # ren = "".join(ren.split())
        z = zip(content,ren)
        for i,o in z:
            print(name,i, '\n', o)
