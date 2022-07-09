#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.base_user import BASEUSER
from  App.util.security import getNewID,MD5
from sqlalchemy import case,func,desc


@app.route('/get_users_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_users_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict=request.args.to_dict()
        # argsdict['iscount']=True
        # argsdict['offset']=0
        # argsdict['limit']=10
        # argsdict['orderby']={'staffcode':'asc'}
        # argsdict['filterby']={'staffcode':'200'}
        if 'action' in argsdict and argsdict['action'] == 'get':
            # 是否查总行数iscount，是否查询起点offset，是否查询行数limit，排序orderby,过滤filterby
            if 'offset' in argsdict and 'limit' in argsdict and 'orderby' in argsdict and 'filterby' in argsdict :
                q = dbsession.query(BASEUSER)
                c=dbsession.query(func.count(BASEUSER.id))
                if json.loads(argsdict['filterby'])!={}:
                    for attr, value in json.loads(argsdict['filterby']).items():
                        q = q.filter(getattr(BASEUSER, attr).like("%%%s%%" % value))
                        c = c.filter(getattr(BASEUSER, attr).like("%%%s%%" % value))
                if json.loads(argsdict['orderby'])!={}:
                    for attr, value in json.loads(argsdict['orderby']).items():
                        if value=='asc':
                            q = q.order_by(attr)
                        else:
                            q = q.order_by(desc(attr))
                else:
                    q=q.order_by('id')
                if int(argsdict['limit'])!=-1:
                    q=q.limit(argsdict['limit'])
                q=q.offset(int(argsdict['offset']))
                if 'iscount' in argsdict and argsdict['iscount'] == 'true':
                    a=c.all()
                    data['countall']=a[0][0]
                data['data'] = json.loads(json.dumps(q.all(), default=BASEUSER.tojson))
            elif 'id' in argsdict and argsdict['id']!='':
                data['data'] = json.loads(json.dumps(dbsession.query(
                    BASEUSER).filter(BASEUSER.id==str(argsdict['id'])).all(), default=BASEUSER.tojson))
            else:
                data['data'] = json.loads(json.dumps(dbsession.query(
                    BASEUSER).all(), default=BASEUSER.tojson))
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
                pw = MD5('1234@abcd')
                newdata = BASEUSER(id=id, realname=form['realname'], staffcode=form['staffcode'],
                                   isenable=form['isenable'], roles=form['roles'], dept=form['dept'], mobile=form['mobile'], email=form['email'],pw=pw, isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASEUSER.query.get(str(id)), default=BASEUSER.tojson))
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
                newdata = BASEUSER.query.get(str(form['id']))
                newdata.realname = form['realname']
                newdata.staffcode = form['staffcode']
                newdata.isenable = form['isenable']
                newdata.roles = form['roles']
                newdata.dept = form['dept']
                newdata.mobile = form['mobile']
                newdata.email = form['email']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BASEUSER.query.get(str(form['id'])), default=BASEUSER.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict:
            deldata = BASEUSER.query.get(str(argsdict['id']))
            dbsession.delete(deldata)
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=BASEUSER.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)



@app.route('/changepw', methods=['GET','POST'])
def changePw():
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'POST':
        # 创建资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata = BASEUSER.query.get(str(form['id']))
                if newdata.pw==MD5(str(form["oldPass"])):
                    if str(form["newPass"])==str(form["rePass"]):
                        if len(str(form["newPass"]))<8:
                            msg = '密码长度至少8位'
                            code = 500
                        else:
                            verrify=[]
                            for i in str(form["newPass"]):
                                if i.isupper():
                                    verrify.append("1")
                                elif i.isnumeric():
                                    verrify.append("2")
                                elif i.islower():
                                    verrify.append("3")
                            if len(set(verrify))<3:
                                msg = '密码强度弱，须同时包含大写字符、小写字符和数字'
                                code = 500
                            else:
                                newdata.pw =MD5(str(form["newPass"]))
                                dbsession.commit()
                                msg='密码修改成功'
                    else:
                        msg = '新密码两次输入不一致'
                        code = 500
                else:
                    msg = '旧密码验证失败'
                    code = 500
                
                
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
   
            


@app.route('/api/resetpw', methods=['GET','POST'])
def resetPw():
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'POST':
        # 创建资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata = BASEUSER.query.get(str(form['id']))
                if newdata:
                    newdata.pw =MD5('1234@abcd')
                    dbsession.commit()
                    msg='密码重置成功'
                    
                else:
                    msg = '密码重置失败'
                    code = 500
                
                
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
                msg = '密码重置失败'
                code = 500
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)
    
    