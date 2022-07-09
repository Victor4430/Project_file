import requests
from lxml import etree
import re
import json

# 判断是否有评分
def panduan(url):
    handers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'}
    req = requests.get(url, headers=handers)
    req.encoding = 'utf-8'
    content = etree.HTML(req.text)
    try:
        aa = '暂无评分'
        pingfen = content.xpath('//*[@id="interest_sectl"]/div/div[2]/div/div[2]/text()')[0]
        if aa == pingfen:
            print("判断有0000000000")
            return False
    except:
        print("判断无0000000000")
        return True



# 传入搜索页面中保存的src   url
def jiexi_url(url):

    handers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'}
    req = requests.get(url, headers=handers)
    req.encoding = 'utf-8'
    content = etree.HTML(req.text)

    # 开始解析
    text = req.text

    # 判断是否有评分
    aa = '暂无评分'
    pingfen = content.xpath('//*[@id="interest_sectl"]/div/div[2]/div/div[2]/text()')[0]
    leix = re.sub('[^\u4e00-\u9fa5]+', '', str(pingfen))


    if aa != leix:
        # print(text)
        # 正则表达式  需要匹配的格式
        geshi_re = '"@context": "http://schema.org",(.*?)</script>'
        geshi = re.compile(geshi_re,re.S)
        js = re.findall(geshi,text)
        join_list = ['{ \n  "@context":"http://schema.org",']

        # 列表拼接
        jk = join_list + js
        re_sip = str(jk)
        re_1 = re_sip.replace(r'\n','').replace("'', '\n  '",'').replace("',",'').replace("'",'').replace("   ",'').replace("  ",'')

        # 转换为json list
        json_file = json.loads(re_1)
        # print(json_file)
        # 剧名
        juming = json_file[0]['name']
        print('剧名：',juming)

        # 地区
        diqu_re = '<span class="pl">制片国家/地区:</span>(.*?)<span class="pl">语言:</span>'
        diqu_geshi = re.compile(diqu_re, re.S)
        json_str = re.findall(diqu_geshi, text)[0]
        diqu = json_str.replace('<br/>\n','').replace(' ','').replace(r'\n','')
        print('地区：',diqu)

        # 类型
        leixing_re = '<span class="pl">类型:</span>(.*?)<span class="pl">官方网站:</span>'
        leixing_geshi = re.compile(leixing_re, re.S)
        leixs = re.findall(leixing_geshi, text)
        # 如果类型报错  排除
        if '' not in leixs:
            # 类型
            leixing_re = '<span class="pl">类型:</span>(.*?)<span class="pl">制片国家/地区:</span>'
            leixing_geshi = re.compile(leixing_re, re.S)
            leixs = re.findall(leixing_geshi, text)[0]
            leix = re.sub('[^\u4e00-\u9fa5]+', '/', leixs)
            print("类型：", leix)

        # 评分
        pingfen = content.xpath('//*[@id="interest_sectl"]/div[1]/div[2]/strong/text()')[0]
        print('评分：', pingfen)

        # 多少人评价
        pingjia = content.xpath('//*[@id="interest_sectl"]/div[1]/div[2]/div/div[2]/a/span/text()')[0]
        print("多少人评价：", pingjia)

        # 导演
        daoyan = json_file[0]['director'][0]['name']
        print('导演：',daoyan)

        bianju_lists = []
        # 编剧
        bianju_list = json_file[0]['author']
        for i in bianju_list:
            for j,k in i.items():
                if j == 'name':
                    # print(k)
                    bianju_lists.append(k)
        del bianju_lists[-1]
        print('编剧：',bianju_lists)

        # 主演
        zhuyan_lists = []
        zhuyan_list = json_file[0]['actor']
        for i in zhuyan_list:
            for j,k in i.items():
                if j == 'name':
                    # print(k)
                    zhuyan_lists.append(k)
        del zhuyan_lists[-1]
        print('主演：',zhuyan_lists)
    else:
        print("该剧  暂无评分!!")

        # 正则表达式  需要匹配的格式
        geshi_re = '"@context": "http://schema.org",(.*?)</script>'
        geshi = re.compile(geshi_re, re.S)
        js = re.findall(geshi, text)
        join_list = ['{ \n  "@context":"http://schema.org",']

        # 列表拼接
        jk = join_list + js
        re_sip = str(jk)
        re_1 = re_sip.replace(r'\n', '').replace("'', '\n  '", '').replace("',", '').replace("'", '').replace("   ",
                                                                                                              '').replace(
            "  ", '')

        # 转换为json list
        json_file = json.loads(re_1)
        # print(json_file)
        # 剧名
        juming = json_file[0]['name']
        print('剧名：', juming)

        # 地区
        diqu_re = '<span class="pl">制片国家/地区:</span>(.*?)<span class="pl">语言:</span>'
        diqu_geshi = re.compile(diqu_re, re.S)
        json_str = re.findall(diqu_geshi, text)[0]
        diqu = json_str.replace('<br/>\n', '').replace(' ', '').replace(r'\n', '')
        print('地区：', diqu)

        # 类型
        leixing_re = '<span class="pl">类型:</span>(.*?)<span class="pl">官方网站:</span>'
        leixing_geshi = re.compile(leixing_re, re.S)
        leixs = re.findall(leixing_geshi, text)
        # 如果类型报错  排除
        if '' not in leixs:
            # 类型
            leixing_re = '<span class="pl">类型:</span>(.*?)<span class="pl">制片国家/地区:</span>'
            leixing_geshi = re.compile(leixing_re, re.S)
            leixs = re.findall(leixing_geshi, text)[0]
            leix = re.sub('[^\u4e00-\u9fa5]+', '/', leixs)
            print("类型：", leix)

        # 导演
        daoyan = json_file[0]['director'][0]['name']
        print('导演：', daoyan)

        bianju_lists = []
        # 编剧
        bianju_list = json_file[0]['author']
        for i in bianju_list:
            for j, k in i.items():
                if j == 'name':
                    # print(k)
                    bianju_lists.append(k)
        del bianju_lists[-1]
        print('编剧：', bianju_lists)

        # 主演
        zhuyan_lists = []
        zhuyan_list = json_file[0]['actor']
        for i in zhuyan_list:
            for j, k in i.items():
                if j == 'name':
                    # print(k)
                    zhuyan_lists.append(k)
        del zhuyan_lists[-1]
        print('主演：', zhuyan_lists)



if __name__ == '__main__':
    url = 'https://movie.douban.com/subject/4016500/'
    jiexi_url(url)