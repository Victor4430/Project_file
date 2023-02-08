from functools import partial
import subprocess

import requests

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import os, execjs
# from 电动自行车.销量.GET import get

ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    'accesstoken': 'NSJC277XXXDSIUWNKX7WDJXBYS65ANUYVFHODWDLAUQZDG2A3U6A110aa5c',
    'referer': 'https://mobile.yangkeduo.com/search_result.html?search_key=%E9%9B%85%E8%BF%AA&search_type=mall&search_met_track=shade&options=1&source=index&tags=&refer_page_name=search_result&refer_page_id=10015_1667127507618_pomxht0ylw&refer_page_sn=10015'

}
url = 'https://mobile.yangkeduo.com/proxy/api/api/search/mall/plus?'


def get_anti_content(ua):
    path = os.path.abspath(os.path.dirname(__file__))
    with open(os.path.join('get_anticontent.js'), 'r', encoding='utf-8') as f:
        js = f.read()
        # print(js,'0000000000000000000000')
    ctx = execjs.compile(js)
    return ctx.call('get_anti', url, ua)


print(get_anti_content(headers['user-agent']))

for i in range(1, 3):
    data = {
        'pdduid': '0',
        'q': '雅迪',
        'page': str(i),
        'size': '20',
        'flip': '4b077d67-d11f-46d9-aa55-94561f581235%3B20',
        'filter': '',
        'anti_content': get_anti_content(headers['user-agent']),
    }
    req = requests.get(url, headers=headers, data=data).json()
    items = req['items']
    print(items)
    for item in items:
        print(item['mall_name'])
        print(item['sales_tip'])
