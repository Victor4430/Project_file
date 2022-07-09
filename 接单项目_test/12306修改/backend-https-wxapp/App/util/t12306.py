import code
from lib2to3.pgen2 import driver
from playwright.sync_api import Playwright, sync_playwright
import time,random,datetime
# 引入随机，防止被认为机器人
def get_track(distance):  # distance为传入的总距离
    rate=random.randint(5,10)
    # 移动轨迹
    track = []
    # 当前位移
    current = 0
    # 减速阈值
    mid = distance * 4 / 5
    # 计算间隔
    t = 1
    # 初速度
    v = distance/rate

    while current < distance:
        if current < mid:
            # 加速度为2
            a = rate
        else:
            # 加速度为-2
            a = 0
        v0 = v
        # 当前速度
        v = v0 + a * t
        # 移动距离
        move = v0 * t + 1 / 2 * a * t * t
        # 当前位移
        current += move
        # 加入轨迹
        track.append(round(move))
    return track
APIURL=[
    # "https://kyfw.12306.cn/otn/login/checkUser",
    # "https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest",
    "https://kyfw.12306.cn/otn/confirmPassenger/initDc",
    "https://kyfw.12306.cn/otn/confirmPassenger/getQueueCount",
    "https://kyfw.12306.cn/otn//payOrder/init"
    ]
PA_URL="https://kyfw.12306.cn/otn/confirmPassenger/getPassengerDTOs"
LOGIN_URL="https://kyfw.12306.cn/otn/resources/login.html"
URL="https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs={fs}&ts={ts}&date={date}&flag=N,N,Y"
ORDER_UNPAY_URL="https://kyfw.12306.cn/otn/view/train_order.html"
passager_table_cols=['序号','姓名','证件类型','证件号码','票种','席别','车厢','席位号','票价']




class TICKETPUACH(object):
    def __init__(self,auto_search_times=10,auto_search_fre=5,auto_search_endtime=None,
        t_names=['D7124','D7116'],fs="北京,BJP",ts='上海,SHH',seat_rule=["二等座",'一等座'],
        date=datetime.datetime.now().strftime('%Y-%m-%d'),train_rule="name",timearea=["00:30","23:30"],username="",passwd="",passengers=[]) -> None:
        # 自动刷新次数
        self.auto_search_times=auto_search_times
        # 自动刷新间隔：秒
        self.auto_search_fre=auto_search_fre
        # 是否完成
        self.is_finish=False
        # 自动刷新截止时间
        self.auto_search_endtime=auto_search_endtime
        # 目标车次
        self.t_names=t_names
        # 出发地
        self.fs=fs
        # 目的地
        self.ts=ts
        # 出发日期
        self.date=date
        # 车次查询规则:name 按动车号
        self.train_rule=train_rule
        # 车次时刻区间：timearea=["00:30","23:30"]
        self.timearea=timearea
        # 座位类型查询规则：seat_rule:list:'商务座-特等座', '一等座', '二等座-二等包座', '高级-软卧', '软卧-一等卧', '动卧', '硬卧-二等卧', '软座', '硬座', '无座'
        self.seat_rule=seat_rule
        # 12306用户名
        self.username=username
        # 12306密码
        self.passwd=passwd
        # 乘车人姓名
        self.passengers=passengers

        self.playwright=sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=False)
        self.context = self.browser.new_context()

    def close(self):
        self.context.close()
        self.browser.close()
        self.playwright.stop()
    def login(self):
        code=200
        msg=""
        page = self.context.new_page()
        page.goto(LOGIN_URL)
        page.locator("[placeholder=\"用户名\\/邮箱\\/手机号\"]").click()
        page.locator("[placeholder=\"用户名\\/邮箱\\/手机号\"]").fill(self.username)
        page.locator("[placeholder=\"密码\"]").click()
        page.locator("[placeholder=\"密码\"]").fill(self.passwd)
        # Click text=立即登录
        page.locator("text=立即登录").click()
        # script = 'Object.defineProperty(navigator,"webdriver",{get:()=>undefined,});'
        # # 滑块42*36，全长340*34
        # drag_long=300
        # # nc_iconfont btn_slide
        # #移动滑块
        # s = page.wait_for_selector('//span[@class="nc_iconfont btn_slide"]',strict=True)
        # page.evaluate(script)
        # box = s.bounding_box()
        # #获取到x坐标中心点位置
        # x = box["x"] + box["width"] / 2
        # y=box["y"] + box["height"] / 2
        # page.mouse.move(x, y)
        # #按下鼠标
        # page.mouse.down()
        # #这个把缺口获取到的长度放到轨迹加工一下得到一个轨迹
        # tracks = get_track(drag_long)
        # for track in tracks[:-1]:
        #     #循环鼠标按照轨迹移动
        #     #strps 是控制单次移动速度的比例是1/10 默认是1 相当于 传入的这个距离不管多远0.1秒钟移动完 越大越慢
        #     page.mouse.move(x + track, y,steps=10)
        #     x += track
        # page.mouse.move(x + tracks[-1], y,steps=10)
        # #移动结束鼠标抬起
        # page.mouse.up()
        time.sleep(3)
        
        # Click text=确定
        page.click('xpath=//*[@class="btn btn-primary ok"]')

        return code,msg

    # url搜索车票信息
    def search(self) :
        code=200
        data={
            "cols":[],
            "datas":[],
            "results":{
                "train":None,
                "train_name":None,
                "seat_type":None,
                "order":"",
                "passagers":[]
            }
        }
        msg=""
        # Open new page
        page = self.context.new_page()

        # Go to https://kyfw.12306.cn/otn/leftTicket/init
        page.goto(URL.format(fs=self.fs,ts=self.ts,date=self.date))
        try:
            t_theader=[]
            theaders=page.query_selector_all("tr[id=\"float\"]")
            for theader in theaders:
                # 表头
                ths=theader.query_selector_all("th")
                for th in ths:
                    t_theader.append(th.inner_text())
                break
            t_theader=[x.split("\n")[0] for x in t_theader]
            data["cols"]=t_theader
            
            tbodys=page.query_selector_all("tbody[id=\"queryLeftTable\"]")
            # 返回表格中的目标tbody
            t_tbody=None
            for handle in tbodys:
                if handle.text_content()!="":
                    t_tbody=handle
                    break
            if t_tbody is None:
                msg="查询无结果"
                code=501
            else:
                trs=t_tbody.query_selector_all("//tr[contains(@id,'ticket_')]")
                for tr in trs:
                    t_value=[]
                    tds=tr.query_selector_all("td")
                    for td in tds:
                        find_button=td.r_all("a")#  ？
                        find_base_info=td.query_selector_all("//div[@class='ticket-info clearfix']")
                        if len(find_base_info)>0:
                            # 基础信息
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="train"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="cdz"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="cds"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="ls"]')[0].inner_text().replace("\n","-"))
                        elif len(find_button)>0:
                            # 按钮
                            t_value.append(find_button[0])
                        else:
                            # 文本
                            t_value.append(td.inner_text().replace("\n","-"))
                    infos=dict(zip(t_theader,t_value))
                    data["datas"].append(infos)

                # 根据规则查找目标车次和座位
                if self.train_rule=="name":
                    # 第一顺位车次没有座位时，接着查第二顺位的车次
                    for t_name in self.t_names:
                        for train in data["datas"]:
                            if t_name==train["车次"]:
                                # 找到车次
                                data["results"]["train"]=train
                                data["results"]["train_name"]=t_name
                                
                                for t_seat in self.seat_rule:
                                    if train[t_seat] not in ["--","无"]:
                                        data["results"]["seat_type"]=t_seat
                                        break
                                break
                        if data["results"]["train"] is not None and data["results"]["seat_type"] is not None:
                            # 找到目标车次和座位，退出循环
                            break
                
                else:
                    code=505
                    msg="找不到目标车次和座位"
            
        except Exception as e:
            code=500
            msg=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+" [Error]:"+str(e)
            


        
            

        # Close page
        # page.close()

        # ---------------------
        # 订单信息有了，出票中，修正code
        if  data["results"]["order"]!="" and len(data["results"]["passagers"])>0 and data["results"]["passagers"][0]["票价"]=="":
            code=510
        return code,data,msg
    
    def order(self) :
        code=200
        data={
            "cols":[],
            "datas":[],
            "results":{
                "train":None,
                "train_name":None,
                "seat_type":None,
                "order":"",
                "passagers":[]
            }
        }
        msg=""
        # Open new page
        page = self.context.new_page()

        # Go to https://kyfw.12306.cn/otn/leftTicket/init
        page.goto(URL.format(fs=self.fs,ts=self.ts,date=self.date))
        try:
            t_theader=[]
            theaders=page.query_selector_all("tr[id=\"float\"]")
            for theader in theaders:
                # 表头
                ths=theader.query_selector_all("th")
                for th in ths:
                    t_theader.append(th.inner_text())
                break
            t_theader=[x.split("\n")[0] for x in t_theader]
            data["cols"]=t_theader
            
            tbodys=page.query_selector_all("tbody[id=\"queryLeftTable\"]")
            # 返回表格中的目标tbody
            t_tbody=None
            for handle in tbodys:
                if handle.text_content()!="":
                    t_tbody=handle
                    break
            if t_tbody is None:
                msg="查询无结果"
                code=501
            else:
                trs=t_tbody.query_selector_all("//tr[contains(@id,'ticket_')]")
                for tr in trs:
                    t_value=[]
                    tds=tr.query_selector_all("td")
                    for td in tds:
                        find_button=td.query_selector_all("a")
                        find_base_info=td.query_selector_all("//div[@class='ticket-info clearfix']")
                        if len(find_base_info)>0:
                            # 基础信息
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="train"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="cdz"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="cds"]')[0].inner_text().replace("\n","-"))
                            t_value.append(find_base_info[0].query_selector_all('//div[@class="ls"]')[0].inner_text().replace("\n","-"))
                        elif len(find_button)>0:
                            # 按钮
                            t_value.append(find_button[0])
                        else:
                            # 文本
                            t_value.append(td.inner_text().replace("\n","-"))
                    infos=dict(zip(t_theader,t_value))
                    data["datas"].append(infos)

                # 根据规则查找目标车次和座位
                if self.train_rule=="name":
                    # 第一顺位车次没有座位时，接着查第二顺位的车次
                    for t_name in self.t_names:
                        for train in data["datas"]:
                            if t_name==train["车次"]:
                                # 找到车次
                                data["results"]["train"]=train
                                data["results"]["train_name"]=t_name
                                
                                for t_seat in self.seat_rule:
                                    if train[t_seat] not in ["--","无"]:
                                        data["results"]["seat_type"]=t_seat
                                        break
                                break
                        if data["results"]["train"] is not None and data["results"]["seat_type"] is not None:
                            # 找到目标车次和座位，退出循环
                            break
                elif self.train_rule=="s_time":
                    pass
                elif self.train_rule=="a_time":
                    pass
                # 订票
                if data["results"]["train"] is not None and data["results"]["seat_type"] is not None:             
                    with page.expect_navigation(url=APIURL[0],wait_until="domcontentloaded") as first:
                        data["results"]["train"]["备注"].click()
                    page.wait_for_load_state()
                    passengers_ul=page.query_selector_all("ul[id=\"normal_passenger_id\"]")
                    if len(passengers_ul) ==0:
                        code=502
                        msg="找不到乘车人列表"
                    else:
                        passengers_li=passengers_ul[0].query_selector_all("li")
                        if len(passengers_li)==0:
                            code=503
                            msg="乘车人列表为空，请添加常用乘车人！"
                        else:
                            find_count=0
                            for passenger_li in passengers_li:
                                if passenger_li.inner_text() in self.passengers:
                                    find_count=find_count+1
                                    # 目标乘车人
                                    passenger_inputs=passenger_li.query_selector_all("input")
                                    passenger_input=passenger_inputs[0]
                                    passenger_input.click()
                                    passenger_input.set_checked(checked=True)
                                    # 选择席别
                                    seat_Ele=page.locator("select[id=\"seatType_{0}\"]".format(str(find_count)))
                                    # 取席别值
                                    seat_Options=page.query_selector_all("select[id=\"seatType_1\"] >> option")
                                    for seat_Option in seat_Options:
                                        if data["results"]["seat_type"] in seat_Option.inner_text():
                                            seat_Ele.select_option(value=seat_Option.get_attribute("value"))
                            if find_count==0:
                                code=504
                                msg="选择乘车人和席别失败！"
                            else:
                                # submitOrder_id
                                submitOrder_btn=page.locator("a[id=\"submitOrder_id\"]")
                                # APIURL
                                with page.expect_response(APIURL[1]) as submit_res:
                                # with page.expect_navigation() as submit_res:
                                    submitOrder_btn.click()
                                # submit_data=submit_res.value
                                # 记录订单信息
                                # qr_submit_id
                                page.wait_for_load_state()
                                time.sleep(5)
                                Order_btn=page.locator("a[id=\"qr_submit_id\"]")
                                # with page.expect_navigation(url=APIURL[2],wait_until="domcontentloaded",timeout=60000) as first:
                                Order_btn.click()
                                page.wait_for_load_state()
                                time.sleep(10)

                                # 在订单页确认是否已订票
                                unpay_order_page = self.context.new_page()

                                unpay_order_page.goto(ORDER_UNPAY_URL)
                                time.sleep(2)
                                tr_passager_by_orders=unpay_order_page.query_selector_all(".has-order-num")
                                if len(tr_passager_by_orders)>0:
                                    for tr_passager_by_order in tr_passager_by_orders:
                                        td_passager_by_orders=tr_passager_by_order.query_selector_all("td")
                                        
                                        if td_passager_by_orders[0].get_attribute("class")=="td-left align-top":
                                            data["results"]["order"]=td_passager_by_orders[0].inner_text().replace("\n","|").replace(u'\xa0',"")
                                            pas_info_value=['1','','中国居民身份证','','','','','','']
                                            pas_info_value[1]=td_passager_by_orders[1].query_selector_all("div >> div")[0].inner_text()
                                            td2=td_passager_by_orders[2].query_selector_all("div")
                                            if len(td2)==1:
                                                pas_info_value[5]=td2[0].inner_text()
                                            elif len(td2)==2:
                                                pas_info_value[5]=td2[0].inner_text()
                                                seat_info=td2[1].inner_text()
                                                pas_info_value[6]=seat_info.split("车")[0]
                                                pas_info_value[7]=seat_info.split("车")[1]
                                            td3=td_passager_by_orders[3].query_selector_all("div")
                                            if len(td3)==1:
                                                pas_info_value[4]=td3[0].inner_text()
                                            elif len(td3)==2:
                                                pas_info_value[4]=td3[0].inner_text()
                                                pas_info_value[8]=td3[1].inner_text()
                                            pas_info=dict(zip(passager_table_cols,pas_info_value))
                                            data["results"]["passagers"].append(pas_info)
                                        else:
                                            pas_info_value=['1','','中国居民身份证','','','','','','']
                                            pas_info_value[1]=td_passager_by_orders[0].query_selector_all("div >> div")[0].inner_text()
                                            td2=td_passager_by_orders[1].query_selector_all("div")
                                            if len(td2)==1:
                                                pas_info_value[5]=td2[0].inner_text()
                                            elif len(td2)==2:
                                                pas_info_value[5]=td2[0].inner_text()
                                                seat_info=td2[1].inner_text()
                                                pas_info_value[6]=seat_info.split("车")[0]
                                                pas_info_value[7]=seat_info.split("车")[1]
                                            td3=td_passager_by_orders[2].query_selector_all("div")
                                            if len(td3)==1:
                                                pas_info_value[4]=td3[0].inner_text()
                                            elif len(td3)==2:
                                                pas_info_value[4]=td3[0].inner_text()
                                                pas_info_value[8]=td3[1].inner_text()
                                            pas_info=dict(zip(passager_table_cols,pas_info_value))
                                            data["results"]["passagers"].append(pas_info)


                else:
                    code=505
                    msg="找不到目标车次和座位"
            
        except Exception as e:
            code=500
            msg=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+" [Error]:"+str(e)
            


        
            

        # Close page
        # page.close()

        # ---------------------
        # 订单信息有了，出票中，修正code
        if  data["results"]["order"]!="" and len(data["results"]["passagers"])>0 and data["results"]["passagers"][0]["票价"]=="":
            code=510
        return code,data,msg

    def check_unpay(self):
        code=200
        data={
            "cols":[],
            "datas":[],
            "results":{
                "order":"",
                "passagers":[]
            }
        }
        msg=""
        unpay_order_page = self.context.new_page()

        unpay_order_page.goto(ORDER_UNPAY_URL)
        time.sleep(2)
        tr_passager_by_orders=unpay_order_page.query_selector_all(".has-order-num")
        if len(tr_passager_by_orders)>0:
            for tr_passager_by_order in tr_passager_by_orders:
                td_passager_by_orders=tr_passager_by_order.query_selector_all("td")
                
                if td_passager_by_orders[0].get_attribute("class")=="td-left align-top":
                    data["results"]["order"]=td_passager_by_orders[0].inner_text().replace("\n","|").replace(u'\xa0',"")
                    pas_info_value=['1','','中国居民身份证','','','','','','']
                    pas_info_value[1]=td_passager_by_orders[1].query_selector_all("div >> div")[0].inner_text()
                    td2=td_passager_by_orders[2].query_selector_all("div")
                    if len(td2)==1:
                        pas_info_value[5]=td2[0].inner_text()
                    elif len(td2)==2:
                        pas_info_value[5]=td2[0].inner_text()
                        seat_info=td2[1].inner_text()
                        pas_info_value[6]=seat_info.split("车")[0]
                        pas_info_value[7]=seat_info.split("车")[1]
                    td3=td_passager_by_orders[3].query_selector_all("div")
                    if len(td3)==1:
                        pas_info_value[4]=td3[0].inner_text()
                    elif len(td3)==2:
                        pas_info_value[4]=td3[0].inner_text()
                        pas_info_value[8]=td3[1].inner_text()
                    pas_info=dict(zip(passager_table_cols,pas_info_value))
                    data["results"]["passagers"].append(pas_info)
                else:
                    pas_info_value=['1','','中国居民身份证','','','','','','']
                    pas_info_value[1]=td_passager_by_orders[0].query_selector_all("div >> div")[0].inner_text()
                    td2=td_passager_by_orders[1].query_selector_all("div")
                    if len(td2)==1:
                        pas_info_value[5]=td2[0].inner_text()
                    elif len(td2)==2:
                        pas_info_value[5]=td2[0].inner_text()
                        seat_info=td2[1].inner_text()
                        pas_info_value[6]=seat_info.split("车")[0]
                        pas_info_value[7]=seat_info.split("车")[1]
                    td3=td_passager_by_orders[2].query_selector_all("div")
                    if len(td3)==1:
                        pas_info_value[4]=td3[0].inner_text()
                    elif len(td3)==2:
                        pas_info_value[4]=td3[0].inner_text()
                        pas_info_value[8]=td3[1].inner_text()
                    pas_info=dict(zip(passager_table_cols,pas_info_value))
                    data["results"]["passagers"].append(pas_info)

        return code,data,msg



