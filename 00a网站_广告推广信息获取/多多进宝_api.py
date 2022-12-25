#!/usr/bin/python3

# -*- coding: utf-8 -*-


import time
import json
import hashlib
import csv
import requests
import datetime

from urllib.parse import urlencode


class PddApi:
    # API域名
    host = "https://gw-api.pinduoduo.com/api/router?"
    # 请求头  请求格式
    headers = {
        "accept": "application/json"
    }
    # 构造函数
    def __init__(self, id=None, token="", secret=None):
        """
        初始化
        """
        self.client_id = id
        self.secret = secret
        self.data_type = "JSON"
    # MD5加密
    def sign_md5(self, params):
        """
        对拼接好的字符串进行md5签名
        """
        hl = hashlib.md5()
        hl.update(params.encode(encoding='utf-8'))
        return hl.hexdigest().upper()

    # 连接字符串
    def splice_str(self):
        """
        升序排序请求参数，连接字符串，并在首尾加上client_secret
        """

        self.timestamp = f"{time.time()}".split(".")[0]  # unix时间戳

        pdd_dict = self.__dict__.copy()

        secret = self.secret

        del pdd_dict["secret"]

        reverse_list = sorted([(k, str(v)) for k, v in pdd_dict.items()], key=lambda x: x[0])

        reverse_list.insert(0, ("", secret))

        reverse_list.append(("", secret))

        reverse_list_str = list(map(lambda x: "".join(x), reverse_list))

        params = "".join(reverse_list_str)

        return params, pdd_dict

    def urlencode_data(self, params, pdd_dict):

        pdd_dict["sign"] = self.sign_md5(params)

        result = urlencode(pdd_dict)

        url = f"{self.host}{result}"

        return url

    def pdd_jinbao(self, **kwargs):
        res_type = "pdd.ddk.goods.recommend.get"

        self.type = res_type

        for k, v in kwargs.items():
            setattr(self, k, v)

        params, pdd_dict = self.splice_str()

        url = self.urlencode_data(params, pdd_dict)
        return self.response_json(url=url)

    def pdd_jinbao_推广位查询(self, **kwargs):
        res_type = "pdd.ddk.goods.pid.query"

        self.type = res_type

        for k, v in kwargs.items():
            setattr(self, k, v)

        params, pdd_dict = self.splice_str()

        url = self.urlencode_data(params, pdd_dict)

        return self.response_json(url=url)
    # 搜索api
    def pdd_sousuo(self, **kwargs):
        res_type = "pdd.ddk.goods.pid.query"

        self.type = res_type

        for k, v in kwargs.items():
            setattr(self, k, v)

        params, pdd_dict = self.splice_str()

        url = self.urlencode_data(params, pdd_dict)

        return self.response_json(url=url)

    def pdd_jinbao_推广链接生成(self, **kwargs):
        res_type = "pdd.ddk.goods.promotion.url.generate"

        self.type = res_type

        for k, v in kwargs.items():
            setattr(self, k, v)

        params, pdd_dict = self.splice_str()

        url = self.urlencode_data(params, pdd_dict)
        return self.response_json(url=url)

    def response_json(self, url):
        proxy = '127.0.0.1:4780'
        proxies = {"http": "http://" + proxy, "https": "http://" + proxy}

        res = requests.post(url=url, headers=self.headers, proxies=proxies)

        return res.json()

    # 代理
    def response_json000(self, url):
        # 设置会话
        session = requests.session()
        # 设置代理端口
        proxy = '127.0.0.1:4780'
        proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
        session = requests.post(url=url, headers=self.headers, proxies=proxies)
        return res.json()


if __name__ == "__main__":
    # 数量标记
    tt = 0
    # 获取当前时间
    current_time = datetime.datetime.now()
    # 以当前时间命名文件
    file_name = str(current_time).split(".")[0].replace(':', '').replace(' ', '_')
    res = PddApi(id="ea9d185d14764477808cec97a9dff623", secret="022bc77519a385d2305395cd2d36bb7baca0544e")
    # print("res================  ", res)
    with open('./' + file_name + '.csv', "a+", encoding="utf8", newline='') as fe:
        # 定义标题栏
        headers = ['商品图片_url', '商品名称', '商品价格', '商品券后价', '商品链接', '销量', '店铺名']
        f_csv = csv.DictWriter(fe, headers)
        # 调用 writerheader() 写入表头
        f_csv.writeheader()
        for num in range(100):
            code = res.pdd_jinbao(offset=num * 20, cat_id='')
            # print("===============", code)

            for i in code["goods_basic_detail_response"]["list"]:
                # 内容_字典（序列）方式
                rows = []
                dict_list = {}
                # print('000000000000000000000000000000000000000000000000000000000', i)
                # print(
                #     f"店铺名:{i['mall_name']}\n商品主图:{i['goods_image_url']}\n优惠券面额:{i['coupon_discount'] / 100}\n价格:{i['min_group_price'] / 100}\n销售量:{i['sales_tip']}\n商品名:{i['goods_name']}\n券后价:{(i['min_group_price'] / 100) - (i['coupon_discount'] / 100)}")
                try:
                    kiis = res.pdd_jinbao_推广链接生成(p_id="36166498_260468268", goods_sign_list=[i["goods_sign"]],
                                                       search_id=i["search_id"])
                    for v in kiis["goods_promotion_url_generate_response"]["goods_promotion_url_list"]:
                        # print(
                        #     f"手机推广长链接:{v['mobile_url']}\n手机推广短连接:{v['mobile_short_url']}\n普通长链接:{v['url']}")
                        print("*" * 150)

                except Exception as f:
                    kiis = res.pdd_jinbao_推广链接生成(p_id="36166498_260468268", goods_sign_list=[i["goods_sign"]])
                    for v in kiis["goods_promotion_url_generate_response"]["goods_promotion_url_list"]:
                        # print(
                        #     f"手机推广长链接:{v['mobile_url']}\n手机推广短连接:{v['mobile_short_url']}\n普通长链接:{v['url']}")
                        print("*" * 150)

                店铺名 = i['mall_name']
                商品主图 = i['goods_image_url']
                优惠券面额 = i['coupon_discount'] / 100
                价格 = "价格："+str(i['min_group_price'] / 100)+"元"
                销售量 = "销量"+str(i['sales_tip'])
                if '+' not in 销售量:
                    销售量 = "销量" + str(i['sales_tip']) + "+"
                else:
                    pass
                商品名 = i['goods_name']
                # 保留一位小数
                券后价 = "券后价："+str(round((i['min_group_price'] / 100) - (i['coupon_discount'] / 100), 2))+"元"
                手机推广链接 = v['mobile_url']
                dict_list['商品图片_url'] = 商品主图
                dict_list['商品名称'] = 商品名
                dict_list['商品价格'] = 价格
                dict_list['商品券后价'] = 券后价
                dict_list['商品链接'] = 手机推广链接
                dict_list['销量'] = 销售量
                dict_list['店铺名'] = 店铺名
                rows.append(dict_list)
                print("店铺名: ", 店铺名)
                print("商品主图: ", 商品主图)
                print("优惠券面额: ", 优惠券面额)
                print("价格: ", 价格)
                print("销售量: ", 销售量)
                print("商品名: ", 商品名)
                print("券后价: ", 券后价)
                print("手机推广链接: ", 手机推广链接)

                # 通过句柄写入内容
                f_csv.writerows(rows)
                tt += 1
                print(f"第 {tt} 条：", '写入成功...........................')



                # csv_writer = csv.writer(fe)
                # csv_writer.writerow(
                #         [i['mall_name'], i['goods_image_url'], i['sales_tip'], i['goods_name'], i['min_group_price'] / 100,
                #          (i['min_group_price'] / 100) - (i['coupon_discount'] / 100), v['mobile_url'],
                #          v['mobile_short_url'], v['url']])
