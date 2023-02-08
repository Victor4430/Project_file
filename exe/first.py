# 任务一：（30分）
# 新建一个工程名为xpcProject
# 新建一个爬虫文件first.py
# 完成新片场首页视频信息的抓取，信息内容如下：
# 图片地址 image_url
# 视频名称 video_name
# 视频作者 video_author
# 发布时间 release_date
# 保存为本地json文件，命名为first.json

from selenium import webdriver
from lxml import etree
import redis


#函数  获取数据
def get_data():
    win.get(url)
    win.maximize_window()
    txt = win.page_source
    tree = etree.HTML(txt)
    lis = tree.xpath("/html/body/div[8]/div[2]/ul/li")

    all_data = []
    ju_data = {}

    for i in lis:
        image_url = i.xpath(".//a/img/@src")[0]   #图片地址
        vedio_name  = i.xpath(".//div/div[1]/a/p/text()")[0]  #视频名称
        vedio_author = i.xpath(".//div/div[2]/a/span[2]/text()")[0]  #视频作者
        release_date = i.xpath(".//a/div[2]/p/text()")[0]  #发布时间
        image_url = str(image_url)
        vedio_name = str(vedio_name)
        vedio_author = str(vedio_author).replace('\t','').replace('\n','')
        release_date = str(release_date)

        print("图片地址："+image_url+"\n"+"视频名称："+vedio_name+"\n"+"视频作者："+vedio_author+"\n"+"发布时间："+release_date)
        with open("first.json","a",encoding='utf-8')as f:
            # f.write("{"+"'图片地址'"+":"+"'"+image_url+"'"+","+"'视频名称'"+":"+"'"+vedio_name+"'"+","+"'视频作者'"+":"+"'"+vedio_author+"'"+","+"'发布时间'"+":"+"'"+release_date+"'"+"}")
            ju_data['图片地址'] = image_url
            ju_data['视频名称'] = vedio_name
            ju_data['视频作者'] = vedio_author
            ju_data['发布时间'] = release_date
            all_data.append(ju_data)
            print("视频:  " + vedio_name + "  信息已抓取中.............." + '\n')
            f.write(str(all_data))
            #连接数据库   存
            r = redis.StrictRedis('localhost',6379)
            r.set('图片地址',image_url)
            r.set('视频名称',vedio_name)
            r.set('视频作者',vedio_author)
            r.set('发布时间',release_date)



    print('\n'+"信息已抓取完毕！！")

if __name__ == '__main__':
    url = 'http://www.xinpianchang.com/channel/index/id-0/sort-addtime/type-0'
    # 去除浏览器被控  字样
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)
    win = webdriver.Chrome(options=options)
    #调用函数  获取数据
    get_data()

