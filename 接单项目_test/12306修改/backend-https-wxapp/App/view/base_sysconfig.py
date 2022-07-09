#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.base_sysconfig import BASESYSCONFIG
from  App.util.security import getNewID

@app.route('/get_basesysconfig_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_basesysconfig_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict=request.args.to_dict()
        if 'action' in argsdict and argsdict['action'] == 'get' and 'ids' in argsdict and argsdict['ids'] != "" :
            ids=json.loads(argsdict['ids'])
            data['data'] = json.loads(json.dumps(dbsession.query(
                BASESYSCONFIG).filter(BASESYSCONFIG.id.in_(ids['objectids'])).all(), default=BASESYSCONFIG.tojson))
        elif 'action' in argsdict and argsdict['action'] == 'get':
            data['data'] = json.loads(json.dumps(dbsession.query(
                BASESYSCONFIG).filter(BASESYSCONFIG.isdelete==False).all(), default=BASESYSCONFIG.tojson))
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
            try:
                newdata = BASESYSCONFIG(id=id, sysconf=form['sysconf'], isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASESYSCONFIG.query.get(str(id)), default=BASESYSCONFIG.tojson))
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
                newdata=BASESYSCONFIG.query.get(str(form['id']))
                newdata.sysconf=form['sysconf']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASESYSCONFIG.query.get(str(form['id'])), default=BASESYSCONFIG.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict :
            deldata=BASESYSCONFIG.query.get(str(argsdict['id']))
            # dbsession.delete(deldata)
            deldata.isdelete=True
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=BASESYSCONFIG.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
