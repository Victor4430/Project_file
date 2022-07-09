#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from App.model.base_release_log import BASERELEASELOG
from App.util.security import getNewID
from sqlalchemy import func

@app.route('/get_releaselog_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_releaselog_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict = dict(request.args)
        if 'action' in argsdict and argsdict['action'] == 'get' and 'ids' in argsdict and argsdict['ids'] != "" :
            ids=json.loads(argsdict['ids'])
            data['data'] = json.loads(json.dumps(dbsession.query(
                BASERELEASELOG).filter(BASERELEASELOG.id.in_(ids['objectids'])).all(), default=BASERELEASELOG.tojson))
        elif 'action' in argsdict and argsdict['action'] == 'get':
            data['data'] = json.loads(json.dumps(dbsession.query(
                BASERELEASELOG).filter(BASERELEASELOG.isdelete==False).order_by(BASERELEASELOG.releasedate.desc()).all(), default=BASERELEASELOG.tojson))
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
                newdata = BASERELEASELOG(id=id, version=form['version'], title=form['title'],releasedate=form['releasedate'],msg=form['msg'],
                                    trophy=form['trophy'], color=form['color'], 
                                    isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASERELEASELOG.query.get(str(id)), default=BASERELEASELOG.tojson))
                
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
                print(e)
                code = 418
        else:
            code = 418
    elif method == 'PUT':
        # 更新资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata=BASERELEASELOG.query.get(str(form['id']))
                
                newdata.version=form['version']
                newdata.title=form['title']
                newdata.releasedate=form['releasedate']
                newdata.msg=form['msg']
                newdata.trophy=form['trophy']
                newdata.color=form['color']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASERELEASELOG.query.get(str(form['id'])), default=BASERELEASELOG.tojson))
                
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict = dict(request.args)
        if 'id' in argsdict :
            deldata=BASERELEASELOG.query.get(str(argsdict['id']))
            # dbsession.delete(deldata)
            deldata.isdelete=True
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=BASERELEASELOG.tojson))
            
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
