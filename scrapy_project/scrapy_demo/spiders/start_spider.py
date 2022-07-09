from scrapy import cmdline

def start():
    print("Go Go Go !!!")
    cmdline.execute('scrapy crawl lianjia'.split())


if __name__ == '__main__':
    print("蜘蛛ready...")
    start()