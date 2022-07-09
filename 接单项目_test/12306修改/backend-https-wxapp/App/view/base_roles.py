#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.base_role import BASEROLES
from  App.util.security import getNewID

@app.route('/get_roles_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_roles_data():
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
            data['data'] = json.loads(json.dumps(dbsession.query(
                BASEROLES).all(), default=BASEROLES.tojson))
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
                newdata = BASEROLES(id=id, name=form['name'], desc=form['desc'],
                                    privs=form['privs'], isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASEROLES.query.get(str(id)), default=BASEROLES.tojson))
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
                newdata=BASEROLES.query.get(str(form['id']))
                newdata.name=form['name']
                newdata.desc=form['desc']
                newdata.privs=form['privs']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASEROLES.query.get(str(form['id'])), default=BASEROLES.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict :
            deldata=BASEROLES.query.get(str(argsdict['id']))
            dbsession.delete(deldata)
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=BASEROLES.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
