#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'用户视图'
__author__ = '黄洵斌'
__wdate__ = '2022-03-26'

from  App import dbsession,  app
import asyncio,datetime
from flask import json, jsonify, g, request
from  App.model.res_order import RES_ORDER
from  App.util.security import getNewID,MD5
from sqlalchemy import case,func,desc
import copy,decimal
from sqlalchemy.orm.attributes import flag_modified


@app.route('/get_res_order_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_res_order_data():
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
                q = dbsession.query(RES_ORDER).filter(RES_ORDER.isdelete==False)
                c=dbsession.query(func.count(RES_ORDER.id)).filter(RES_ORDER.isdelete==False)
                if json.loads(argsdict['filterby'])!={}:
                    for attr, value in json.loads(argsdict['filterby']).items():
                        if getattr(RES_ORDER, attr,0)!=0:
                            q = q.filter(getattr(RES_ORDER, attr).like("%%%s%%" % value))
                            c = c.filter(getattr(RES_ORDER, attr).like("%%%s%%" % value))
                        elif getattr(RES_ORDER, attr.split("__")[0],0)!=0:
                            q = q.filter(getattr(RES_ORDER, attr.split("__")[0]).like("%%%s%%" % value))
                            c = c.filter(getattr(RES_ORDER, attr.split("__")[0]).like("%%%s%%" % value))
                if json.loads(argsdict['f_filterby'])!={}:
                    foreignRefs=RES_ORDER.foreignRefs()
                    for attr, value in json.loads(argsdict['f_filterby']).items():
                        if attr in foreignRefs:
                            q = q.outerjoin(foreignRefs[attr][1],getattr(RES_ORDER,foreignRefs[attr][0])==getattr(foreignRefs[attr][1],foreignRefs[attr][2])).filter(getattr(foreignRefs[attr][1], foreignRefs[attr][3]).like("%%%s%%" % value))
                            c = c.outerjoin(foreignRefs[attr][1],getattr(RES_ORDER,foreignRefs[attr][0])==getattr(foreignRefs[attr][1],foreignRefs[attr][2])).filter(getattr(foreignRefs[attr][1], foreignRefs[attr][3]).like("%%%s%%" % value))
                 
                privs=g.user.privs
                if '数据权限-全部' not in privs and RES_ORDER not in privs:
                    q=q.filter(RES_ORDER.create_userid==g.user.id)
                    c=c.filter(RES_ORDER.create_userid==g.user.id)
                if json.loads(argsdict['orderby'])!={}:
                    for attr, value in json.loads(argsdict['orderby']).items():
                        if getattr(RES_ORDER, attr,0)!=0:
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
                data['data'] = json.loads(json.dumps(q.all(), default=RES_ORDER.tojson))
            elif 'id' in argsdict and argsdict['id']!='':
                data['data'] = json.loads(json.dumps(dbsession.query(
                    RES_ORDER).filter(RES_ORDER.id==str(argsdict['id'])).all(), default=RES_ORDER.tojson))
            elif 'history' in argsdict and argsdict['history']!='':
                data['data'] = json.loads(json.dumps(dbsession.query(
                    RES_ORDER).all(), default=RES_ORDER.tojson))
            else:
                data['data'] = json.loads(json.dumps(dbsession.query(
                    RES_ORDER).filter(RES_ORDER.isdelete==False).all(), default=RES_ORDER.tojson))
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
                newdata = RES_ORDER(id=id, task_id=form["task_id"],passagers=form["passagers"],order=form["order"], create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                    isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    RES_ORDER.query.get(str(id)), default=RES_ORDER.tojson))
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
                newdata = RES_ORDER.query.get(str(form['id']))
                newdata.task_id=form["task_id"]
                newdata.passagers=form["passagers"]
                newdata.order=form["order"]
                
                dbsession.commit()
                
                data['data'] = json.loads(json.dumps(
                    RES_ORDER.query.get(str(form['id'])), default=RES_ORDER.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict:
            deldata = RES_ORDER.query.get(str(argsdict['id']))
            deldata.isdelete=True
            # dbsession.delete(deldata)
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=RES_ORDER.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
