#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 异步_模板.py
# @IDE       :PyCharm
# @Time      :2022/8/7 22:55
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com


import asyncio
import aiohttp
from lxml import html
import datetime
import requests

async def get_url(url, header=None):
    """请求url"""
    # print('get_url thread_id', threading.get_ident())

    sem = asyncio.Semaphore(100)  # 并发数量限制
    # timeout = aiohttp.ClientTimeout(total=3)  # 超时
    async with sem:
        async with aiohttp.ClientSession(headers=header, cookies='') as session:
            async with session.get(url) as resp:
                if resp.status in [200, 201]:
                    data = await resp.text()
                    # print(data)
                    return data


async def parse(url):
    """解析每页的每篇帖子的url放入队列"""
    # print('parse thread_id', threading.get_ident())

    html = await get_url(url)
    h = etree.HTML(html)
    list_title = h.xpath('/html/body/div[1]/div[2]/div/p/a/@href')
    # print('456456')
    print(len(list_title))
    for i in list_title:
        # print('123123')
        main_url = 'https://yazhouseba.co/' + i
        print('拼接好的url：', main_url)
        await q.put(main_url)

    print('队列长度: {}'.format(q.qsize()))
    return


def parse_url_list(url):
    """解析每页的每篇帖子的url放入队列"""
    # 设置代理端口
    proxy = '127.0.0.1:4780'
    proxies = {"http": "http://" + proxy, "https": "http://" + proxy}

    html = requests.get(url, proxies=proxies).text
    h = etree.HTML(html)
    list_title = h.xpath('/html/body/div[1]/div[2]/div/p/a/@href')
    all_urllist = []
    for i in list_title:
        main_url = 'https://yazhouseba.co/' + i
        all_urllist.append(main_url)
    # print('完整url列表:', all_urllist)
    return all_urllist


async def parse2():
    """从队列中取出每篇帖子解析出 标题,内容,作者等..."""

    if q.qsize() != 0:
        url = await q.get()
        html_parse = await get_url(url)
        h = etree.HTML(html_parse)
        title = h.xpath('/html/body/div[1]/div[2]/div[2]/h1/text()')
        content = h.xpath("/html/body/div[1]/div[2]/div[2]/div[1]/div/text()")

        title = title[0]
        content = str(content).replace("[", '').replace(r"\u3000", ' ').replace("==记住==", '').replace(
            r"网址:\xa0\xa0", '').replace(',', '\n\t').replace("'", '').replace(
            r"\xa0", '').replace(r"\ue4c6\ue4c6", '').replace(
            "]", '').replace('.', '').replace(r"\ue4c6", '').replace("更多精彩内容尽在淫香淫色eee67", '').replace(" ", '').replace(
            "@@", '')
        print('title: ', title)
        print('content: ', content)

        new = "{}\n\t {}\n".format(title, content)
        # await parse(url_next_page)
        return new
    else:
        print('队列已经为空了！')


async def save_data():
    """保存"""
    p = await parse2()
    with open('xxoo.txt', 'a') as f:
        f.write(str(p))


async def main(url):
    """
    main
    主程序
    """
    start_time = datetime.datetime.now()
    print(start_time)
    print('===第一步:获取每个url===')

    urls = q.put_nowait(await(parse(url)))
    print('长度urls：', urls)
    tasks = [asyncio.create_task(parse(url)) for url in range(0, q.qsize())]
    await asyncio.wait(tasks)
    print('完成\n')
    # one_time = datetime.datetime.now() - start_time
    # print('第一个总耗时{}'.format(one_time))

    print('===第二部:抓取内容===')
    print('队列长度:{}'.format(q.qsize()))

    tasks2 = [asyncio.create_task(save_data()) for _ in range(0, q.qsize() - 1)]
    await asyncio.wait(tasks2)
    print('完成\n')
    all_time = datetime.datetime.now() - start_time
    print('总耗时:{}'.format(all_time))


if __name__ == '__main__':
    etree = html.etree

    first_url = 'https://yazhouseba.co/article.php?cate=3'

    q = asyncio.Queue()
    asyncio.run(main(first_url))
    print('程序结束！！！！！！！')
