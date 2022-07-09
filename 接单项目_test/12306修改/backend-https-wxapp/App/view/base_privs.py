#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.base_privs import BASEPRIVS
from  App.util.security import getNewID

@app.route('/get_privs_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_privs_data():
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
                BASEPRIVS).all(), default=BASEPRIVS.tojson))
        elif 'action' in argsdict and argsdict['action'] == 'handle':
            pass
        else:
            code = 418
    elif method == 'POST':
        pass
        # 创建资源
        # argsdict = json.loads(str(request.data, 'utf-8'))
        # if 'form' in argsdict:
        #     form = argsdict['form']
        #     id = getNewID()
        #     try:
        #         newdata = BASEDBCLS(id=id, name=form['name'], ip=form['ip'],
        #                             port=form['port'], clsinfo=form['clsinfo'], 
        #                             dbtype=form['dbtype'], version=form['version'],
        #                              cminfo=form['cminfo'], dbinfo=form['dbinfo'],
        #                               insinfo=form['insinfo'], period=form['period'], isdelete=False)
        #         dbsession.add(newdata)
        #         dbsession.commit()
        #         data['data'] = json.dumps(
        #             BASEDBCLS.query.get(str(id)), default=BASEDBCLS.tojson)
        #     except Exception as e:
        #         # 生产上可以改为log
        #         app.logger.error(e)
        #         code = 418
        # else:
        #     code = 418
    elif method == 'PUT':
        # 更新资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata=BASEPRIVS.query.get(str(form['id']))
                newdata.name=form['name']
                newdata.value=form['value']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASEPRIVS.query.get(str(form['id'])), default=BASEPRIVS.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        # argsdict=request.args.to_dict()
        # if 'id' in argsdict :
        #     deldata=BASEPRIVS.query.get(str(argsdict['id'][0]))
        #     dbsession.delete(deldata)
        #     dbsession.commit()
        #     data['data'] = json.dumps(deldata, default=BASEPRIVS.tojson)
        # else:
        #     code = 418
        pass
    return jsonify(code=code, data=data, msg=msg)
