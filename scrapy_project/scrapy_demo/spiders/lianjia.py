import scrapy


class LianjiaSpider(scrapy.Spider):
    name = 'lianjia'
    allowed_domains = ['cq.lianjia.com']
    start_urls = ['https://cq.lianjia.com/ershoufang/rs%E6%B1%9F%E5%8C%97/']

    def parse(self, response):
        print('This is response     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

