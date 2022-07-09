#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'用户视图'
__author__ = '黄洵斌'
__wdate__ = '2022-03-26'

import time
from  App import dbsession,  app
import asyncio,datetime
from flask import json, jsonify, g, request
from  App.model.task import TASK
from  App.model.res_order import RES_ORDER
from  App.model.res_search import RES_SEARCH
from  App.model.res_seat import RES_SEAT
from  App.util.security import getNewID,MD5
from sqlalchemy import case,func,desc
import copy,decimal
from sqlalchemy.orm.attributes import flag_modified
from App.util.t12306 import TICKETPUACH


@app.route('/get_task_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_task_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict=request.args.to_dict()
        if 'action' in argsdict and argsdict['action'] == 'get':
            # 是否查总行数iscount，是否查询起点offset，是否查询行数limit，排序orderby,过滤filterby
            if 'offset' in argsdict and 'limit' in argsdict and 'orderby' in argsdict and 'filterby' in argsdict :
                q = dbsession.query(TASK).filter(TASK.isdelete==False)
                c=dbsession.query(func.count(TASK.id)).filter(TASK.isdelete==False)
                if json.loads(argsdict['filterby'])!={}:
                    for attr, value in json.loads(argsdict['filterby']).items():
                        if getattr(TASK, attr,0)!=0:
                            q = q.filter(getattr(TASK, attr).like("%%%s%%" % value))
                            c = c.filter(getattr(TASK, attr).like("%%%s%%" % value))
                        elif getattr(TASK, attr.split("__")[0],0)!=0:
                            q = q.filter(getattr(TASK, attr.split("__")[0]).like("%%%s%%" % value))
                            c = c.filter(getattr(TASK, attr.split("__")[0]).like("%%%s%%" % value))
                if json.loads(argsdict['f_filterby'])!={}:
                    foreignRefs=TASK.foreignRefs()
                    for attr, value in json.loads(argsdict['f_filterby']).items():
                        if attr in foreignRefs:
                            q = q.outerjoin(foreignRefs[attr][1],getattr(TASK,foreignRefs[attr][0])==getattr(foreignRefs[attr][1],foreignRefs[attr][2])).filter(getattr(foreignRefs[attr][1], foreignRefs[attr][3]).like("%%%s%%" % value))
                            c = c.outerjoin(foreignRefs[attr][1],getattr(TASK,foreignRefs[attr][0])==getattr(foreignRefs[attr][1],foreignRefs[attr][2])).filter(getattr(foreignRefs[attr][1], foreignRefs[attr][3]).like("%%%s%%" % value))
                 
                privs=g.user.privs
                if '数据权限-全部' not in privs and TASK not in privs:
                    q=q.filter(TASK.create_userid==g.user.id)
                    c=c.filter(TASK.create_userid==g.user.id)
                if json.loads(argsdict['orderby'])!={}:
                    for attr, value in json.loads(argsdict['orderby']).items():
                        if getattr(TASK, attr,0)!=0:
                            if value=='asc':
                                q = q.order_by(attr)
                            else:
                                q = q.order_by(desc(attr))
                else:
                    q=q.order_by(desc('create_date'))
                if int(argsdict['limit'])!=-1:
                    q=q.limit(argsdict['limit'])
                q=q.offset(int(argsdict['offset']))
                if 'iscount' in argsdict and argsdict['iscount'] == 'true':
                    a=c.all()
                    data['countall']=a[0][0]
                data['data'] = json.loads(json.dumps(q.all(), default=TASK.tojson))
            elif 'id' in argsdict and argsdict['id']!='':
                data['data'] = json.loads(json.dumps(dbsession.query(
                    TASK).filter(TASK.id==str(argsdict['id'])).all(), default=TASK.tojson))
            elif 'history' in argsdict and argsdict['history']!='':
                data['data'] = json.loads(json.dumps(dbsession.query(
                    TASK).all(), default=TASK.tojson))
            else:
                data['data'] = json.loads(json.dumps(dbsession.query(
                    TASK).filter(TASK.isdelete==False).all(), default=TASK.tojson))
        elif 'action' in argsdict and argsdict['action'] == 'handle':
            pass
        else:
            code = 418
    elif method == 'POST':
        # 创建资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            id = getNewID()
            # 按时间自动创建编号
            nowdate=datetime.datetime.now()
            try:
                newdata = TASK(id=id, username=form["username"],name=form["name"],passwd=form["passwd"],passengers=form["passengers"],t_names=form["t_names"],fs=form["fs"],ts=form["ts"],seat_rule=form["seat_rule"],date=form["date"],train_rule=form["train_rule"],auto_search_times=form["auto_search_times"],auto_search_fre=form["auto_search_fre"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                    isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    TASK.query.get(str(id)), default=TASK.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
                code = 418
        else:
            code = 418
    elif method == 'PUT':
        # 更新资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata = TASK.query.get(str(form['id']))
                newdata.username=form["username"]
                newdata.name=form["name"]
                newdata.passwd=form["passwd"]
                newdata.passengers=form["passengers"]
                newdata.t_names=form["t_names"]
                newdata.fs=form["fs"]
                newdata.ts=form["ts"]
                newdata.seat_rule=form["seat_rule"]
                newdata.date=form["date"]
                newdata.train_rule=form["train_rule"]
                newdata.auto_search_times=form["auto_search_times"]
                newdata.auto_search_fre=form["auto_search_fre"]
                
                dbsession.commit()
                
                data['data'] = json.loads(json.dumps(
                    TASK.query.get(str(form['id'])), default=TASK.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict:
            deldata = TASK.query.get(str(argsdict['id']))
            deldata.isdelete=True
            # dbsession.delete(deldata)
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=TASK.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)

@app.route('/task_order_ticket', methods=['GET', 'POST', 'PUT', 'DELETE'])
def task_order_ticket():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if  method == 'POST':
        # 创建资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict and "id" in argsdict['form']:
            id = argsdict['form']["id"]
            task=TASK.query.get(id)
            if task is not None:
                t=TICKETPUACH(
                    t_names=task.t_names,fs=task.fs,ts=task.ts,seat_rule=task.seat_rule,
                    date=task.date,train_rule="name",
                    username=task.username,passwd=task.passwd,passengers=task.passengers)
                login_code,login_msg=t.login()
                if login_code==200:
                    code,sdata,msg=t.order()
                    for dd in sdata["datas"]:
                        dd["备注"]=''
                    if sdata["results"]["train"] is not None:
                        sdata["results"]["train"]["备注"]=""
                    t.close()

                    RES_SEARCHid = getNewID()
                    RES_SEATid = getNewID()
                    RES_ORDERid = getNewID()
                    # 按时间自动创建编号
                    nowdate=datetime.datetime.now()
                    try:
                        
                        RES_SEARCHnewdata = RES_SEARCH(id=RES_SEARCHid, task_id=id,cols=sdata["cols"],datas=sdata["datas"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                            isdelete=False)
                        dbsession.add(RES_SEARCHnewdata)
                        RES_SEATnewdata = RES_SEAT(id=RES_SEATid, task_id=id,code=code,msg=msg,train_info=sdata["results"]["train"],passagers=sdata["results"]["passagers"],train_name=sdata["results"]["train_name"],seat_type=sdata["results"]["seat_type"],order=sdata["results"]["order"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                            isdelete=False)
                        
                        
                        RES_ORDERnewdata = RES_ORDER(id=RES_ORDERid, task_id=id,passagers=sdata["results"]["passagers"],order=sdata["results"]["order"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                            isdelete=False)
                        
                        if code==510:
                            while True:
                                ti=TICKETPUACH(
                                    t_names=task.t_names,fs=task.fs,ts=task.ts,seat_rule=task.seat_rule,
                                    date=task.date,train_rule="name",
                                    username=task.username,passwd=task.passwd,passengers=task.passengers)
                                ti.login()
                                time.sleep(5)
                                ccode,cdata,cmsg=ti.check_unpay()
                                ti.close()
                                if  cdata["results"]["order"]!="" and len(cdata["results"]["passagers"])>0 :
                                    if cdata["results"]["passagers"][0]["票价"]!="":
                                        code=200
                                        msg=""
                                        RES_SEATnewdata.code=200
                                        RES_SEATnewdata.msg="成功"
                                        RES_SEATnewdata.order=cdata["results"]["order"]
                                        RES_SEATnewdata.passagers=cdata["results"]["passagers"]
                                        RES_ORDERnewdata.order=cdata["results"]["order"]
                                        RES_ORDERnewdata.passagers=cdata["results"]["passagers"]
                                        break
                                    else:
                                        pass
                                else:
                                    code=511
                                    msg="抢票失败或失去购票资格"
                                    RES_SEATnewdata.code=code
                                    RES_SEATnewdata.msg=msg
                                    break
                            
                            
                            
                        dbsession.add(RES_SEATnewdata)
                        dbsession.add(RES_ORDERnewdata)
                        dbsession.commit()
                        data['data'] = json.loads(json.dumps(
                                RES_SEAT.query.get(str(RES_SEATid)), default=RES_SEAT.tojson))
                    except Exception as e:
                        # 生产上可以改为log
                        app.logger.error(e)
                        code = 418
                    
                else:
                    code=login_code
                    msg="登录验证失败"
                    t.close()

            else:
                code=418
                msg="任务不存在"    
            
        else:
            code = 418
            msg="服务参数验证错误"
    
    return jsonify(code=code, data=data, msg=msg)




@app.route('/task_search_ticket', methods=['GET', 'POST', 'PUT', 'DELETE'])
def task_search_ticket():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if  method == 'POST':
        # 创建资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict and "id" in argsdict['form']:
            id = argsdict['form']["id"]
            task=TASK.query.get(id)
            if task is not None:
                t=TICKETPUACH(
                    t_names=task.t_names,fs=task.fs,ts=task.ts,seat_rule=task.seat_rule,
                    date=task.date,train_rule="name",
                    username=task.username,passwd=task.passwd,passengers=task.passengers)
                login_code,login_msg=t.login()
                if login_code==200:
                    scode,sdata,smsg=t.search()
                    if scode==200:
                        RES_SEARCHid = getNewID()
                        # 按时间自动创建编号
                        nowdate=datetime.datetime.now()
                        try:
                            for dd in sdata["datas"]:
                                dd["备注"]=''
                            newdata = RES_SEARCH(id=RES_SEARCHid, task_id=id,cols=sdata["cols"],datas=sdata["datas"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                                isdelete=False)
                            dbsession.add(newdata)
                            dbsession.commit()
                            data['data'] = json.loads(json.dumps(
                                RES_SEARCH.query.get(str(RES_SEARCHid)), default=RES_SEARCH.tojson))
                        except Exception as e:
                            # 生产上可以改为log
                            app.logger.error(e)
                            code = 418
                    else:
                        code=scode
                        msg=smsg
                else:
                    code=login_code
                    msg="登录验证失败"
                t.close()
            else:
                code=418
                msg="任务不存在"    
            
        else:
            code = 418
            msg="服务参数验证错误"
    
    return jsonify(code=code, data=data, msg=msg)


