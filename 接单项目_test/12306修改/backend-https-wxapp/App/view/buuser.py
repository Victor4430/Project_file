#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.buuser import BUUSER
from  App.util.security import getNewID
from sqlalchemy.orm.attributes import flag_modified
import datetime
from sqlalchemy import case,func
from App.view.uploadfile import removeAva

@app.route('/get_buuser_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_buuser_data():
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
                BUUSER).filter(BUUSER.id.in_(ids['objectids'])).all(), default=BUUSER.tojson))
        elif 'action' in argsdict and argsdict['action'] == 'get':
            data['data'] = json.loads(json.dumps(dbsession.query(
                BUUSER).order_by(BUUSER.c_isapply.desc()).order_by(BUUSER.iscompany).all(), default=BUUSER.tojson))
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
                newdata = BUUSER(id=id, realname=form['realname'], wxcode=form['wxcode'],
                                    isenable=form['isenable'], ava=form['ava'], 
                                    addrs=form['addrs'], lovers=form['lovers'],iscompany=form['iscompany'],c_lovers=form['c_lovers'],c_isapply=form['c_isapply'],c_info=form['c_info'],
                                     tmpsite=form['tmpsite'],  isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BUUSER.query.get(str(id)), default=BUUSER.tojson))
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
                newdata=BUUSER.query.get(str(form['id']))
                newdata.realname=form['realname']
                newdata.wxcode=form['wxcode']
                newdata.isenable=form['isenable']
                newdata.ava=form['ava']
                newdata.addrs=form['addrs']
                newdata.lovers=form['lovers']
                newdata.tmpsite=form['tmpsite']
                newdata.iscompany=form['iscompany']
                newdata.c_lovers=form['c_lovers']
                newdata.c_info=form['c_info']
                newdata.c_isapply=form['c_isapply']
                dbsession.commit()
                data['data'] = json.loads(json.dumps(
                    BUUSER.query.get(str(form['id'])), default=BUUSER.tojson))
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    elif method == 'DELETE':
        # 删除资源
        argsdict=request.args.to_dict()
        if 'id' in argsdict :
            deldata=BUUSER.query.get(str(argsdict['id']))
            dbsession.delete(deldata)
            dbsession.commit()
            data['data'] = json.loads(json.dumps(deldata, default=BUUSER.tojson))
        else:
            code = 418
    return jsonify(code=code, data=data, msg=msg)



# 企业用户注册
@app.route('/register_company_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def register_company_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if  method == 'PUT':
        # 更新资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict:
            form = argsdict['form']
            try:
                newdata=BUUSER.query.filter_by(openid=form['openid']).first()
                newdata.c_isapply=True
                newdata.c_info['tel']=form['tel']
                newdata.c_info['manager']=form['manager']
                newdata.c_info['regdate']=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                flag_modified(newdata, "c_info")
                dbsession.commit()
                data['data'] = {'success':1}
            except Exception as e:
                # 生产上可以改为log
                app.logger.error(e)
        else:
            code = 418
    
    return jsonify(code=code, data=data, msg=msg)

# 增删购物车商品
# form:
# {
#     'type': '2', #类型：'1'为个人版，'2'为企业版
#     'storeid': '9364a718-a9bd-11e9-bb46-e4b97a451585',#商家id
#     'goodsid': 'b410f4a8-efea-11e9-a9f5-e4b97a451585',#商品id
#     'size': '标准',#规格
#     'count': 1,#数量
#     'properties':#属性
#     {
#         '辣度': '不辣',
#         '手套': '4个'
#     }
# }

    
@app.route('/get_buuser_lovers_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_buuser_lovers_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    # 是否app用户
    if 'Sessiontoken' in request.headers and request.headers['Sessiontoken']!='':
        buuser= BUUSER.query.filter_by(openid=request.headers['Sessiontoken']).first()
        if buuser is None:
            code=418
            msg='找不到该用户'
        else:
            if method == 'GET':
                # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
                data['data']={'lovers':buuser.lovers['lovers'],'c_lovers':buuser.c_lovers['lovers']}
            elif method == 'POST':
                # 创建资源
                argsdict = json.loads(str(request.data, 'utf-8'))
                if 'form' in argsdict:
                    form = argsdict['form']
                    if 'type' in form and 'storeid' in form and 'goodsid' in form and 'size' in form and 'properties' in form and 'count' in form:
                        
                        id=buuser.id
                        notexist=True
                        existgoods=form
                        try:
                            if form['type']=='1':
                                for item in buuser.lovers['lovers']:
                                    if item['type']==form['type'] and item['storeid']==form['storeid'] and item['goodsid']==form['goodsid'] and item['size']==form['size'] and item['properties']==form['properties'] :
                                        existgoods=item
                                        existgoods['count']=existgoods['count']+int(form['count'])
                                        buuser.lovers['lovers'].remove(item)
                                        buuser.lovers['lovers'].insert(0,existgoods)
                                        notexist=False
                                        break
                                if notexist:
                                    buuser.lovers['lovers'].insert(0,existgoods)
                                flag_modified(buuser,'lovers')
                                dbsession.commit()
                                data['data'] =  BUUSER.query.get(str(id)).lovers['lovers']

                            elif form['type']=='2':
                                for item in buuser.c_lovers['lovers']:
                                    if item['type']==form['type'] and item['storeid']==form['storeid'] and item['goodsid']==form['goodsid'] and item['size']==form['size'] and item['properties']==form['properties'] :
                                        existgoods=item
                                        existgoods['count']=existgoods['count']+int(form['count'])
                                        buuser.lovers['lovers'].remove(item)
                                        buuser.lovers['lovers'].insert(0,existgoods)
                                        notexist=False
                                        break
                                if notexist:
                                    buuser.lovers['lovers'].insert(0,existgoods)
                                flag_modified(buuser,'c_lovers')
                                dbsession.commit()
                                data['data'] =  BUUSER.query.get(str(id)).c_lovers['lovers']
                            
                        except Exception as e:
                            # 生产上可以改为log
                            app.logger.error(e)
                            code = 418
                    else:
                        code=418
                else:
                    code = 418
            elif method == 'PUT':
                argsdict = json.loads(str(request.data, 'utf-8'))
                if 'form' in argsdict:
                    form = argsdict['form']
                    if 'type' in form and 'storeid' in form and 'goodsid' in form and 'size' in form and 'properties' in form and 'count' in form:
                        
                        id=buuser.id
                        existgoods=form
                        try:
                            if form['type']=='1':
                                for item in buuser.lovers['lovers']:
                                    if item['type']==form['type'] and item['storeid']==form['storeid'] and item['goodsid']==form['goodsid'] and item['size']==form['size'] and item['properties']==form['properties'] :
                                        existgoods=item
                                        

                                        existgoods['count']=existgoods['count']-int(form['count'])
                                        buuser.lovers['lovers'].remove(item)
                                        if existgoods['count']>0:
                                            buuser.lovers['lovers'].insert(0,existgoods)
                                        break
                                
                                flag_modified(buuser,'lovers')
                                dbsession.commit()
                                data['data'] =  BUUSER.query.get(str(id)).lovers['lovers']

                            elif form['type']=='2':
                                for item in buuser.c_lovers['lovers']:
                                    if item['type']==form['type'] and item['storeid']==form['storeid'] and item['goodsid']==form['goodsid'] and item['size']==form['size'] and item['properties']==form['properties'] :
                                        existgoods=item
                                        existgoods['count']=existgoods['count']+int(form['count'])
                                        buuser.lovers['lovers'].remove(item)
                                        if existgoods['count']>0:
                                            buuser.lovers['lovers'].insert(0,existgoods)
                                        break
                               
                                flag_modified(buuser,'c_lovers')
                                dbsession.commit()
                                data['data'] =  BUUSER.query.get(str(id)).c_lovers['lovers']
                            
                        except Exception as e:
                            # 生产上可以改为log
                            app.logger.error(e)
                            code = 418
                    else:
                        code=418
                else:
                    code = 418
                # 更新资源
                # argsdict = json.loads(str(request.data, 'utf-8'))
                # if 'form' in argsdict:
                #     form = argsdict['form']
                #     try:
                #         newdata=BUUSER.query.get(str(form['id']))
                #         newdata.realname=form['realname']
                #         newdata.wxcode=form['wxcode']
                #         newdata.isenable=form['isenable']
                #         newdata.ava=form['ava']
                #         newdata.addrs=form['addrs']
                #         newdata.lovers=form['lovers']
                #         newdata.tmpsite=form['tmpsite']
                #         newdata.iscompany=form['iscompany']
                #         newdata.c_lovers=form['c_lovers']
                #         newdata.c_info=form['c_info']
                #         newdata.c_isapply=form['c_isapply']
                #         dbsession.commit()
                #         data['data'] = json.loads(json.dumps(
                #             BUUSER.query.get(str(form['id'])), default=BUUSER.tojson))
                #     except Exception as e:
                #         # 生产上可以改为log
                #         app.logger.error(e)
                # else:
                #     code = 418
                code=418
                msg='购物车商品不能修改'
            elif method == 'DELETE':
                # 删除资源
                argsdict=request.args.to_dict()
                if 'id' in argsdict :
                    deldata=BUUSER.query.get(str(argsdict['id']))
                    dbsession.delete(deldata)
                    dbsession.commit()
                    data['data'] = json.loads(json.dumps(deldata, default=BUUSER.tojson))
                else:
                    code = 418
    else:
        code=418
        msg='只有移动端可以访问'
    return jsonify(code=code, data=data, msg=msg)

# form:
# {
#     'id':"xxx"
#     'applyuser':"hxb",#姓名
#     'applyusersex':1,#1:先生，2:女士
#     'applyusertel':'15712345678',#收货人联系方式
#     'sendsite':{"lat": 0, "lng": 0},#收货地址经纬度
#     'sendaddr':'xx大厦xx室',#具体收货地址门牌号
#     'type':'家',#标签：家、公司、学校
#     'isdefault':True #是否默认地址
# }   
@app.route('/get_buuser_addrs_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_buuser_addrs_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    # 是否app用户
    if 'Sessiontoken' in request.headers and request.headers['Sessiontoken']!='':
        buuser= BUUSER.query.filter_by(openid=request.headers['Sessiontoken']).first()
        if buuser is None:
            code=418
            msg='找不到该用户'
        else:
            buuserid=buuser.id
            if method == 'GET':
                # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
                data['data']=buuser.addrs['addrs']
            elif method == 'POST':
                # 创建资源
                argsdict = json.loads(str(request.data, 'utf-8'))
                if 'form' in argsdict:
                    form = argsdict['form']
                    if 'applyuser' in form and 'applyusersex' in form and 'applyusertel' in form and 'sendsite' in form and 'sendaddr' in form and 'type' in form and 'isdefault' in form:
                        id = getNewID()
                        try:
                            if form['isdefault']==True:
                                for i,v in enumerate(buuser.addrs['addrs']):
                                    if v['isdefault']==True:
                                        buuser.addrs['addrs'][i]['isdefault']=False
                            buuser.addrs['addrs'].insert(0,{
                                'id':id,
                                'applyuser':form['applyuser'],
                                'applyusersex':form['applyusersex'],
                                'applyusertel':form['applyusertel'],
                                'sendsite':form['sendsite'],
                                'sendaddr':form['sendaddr'],
                                'isdefault':form['isdefault'],
                                'type':form['type']
                            })
                            flag_modified(buuser,'addrs')
                            dbsession.commit()
                            data['data'] =  BUUSER.query.get(str(buuserid)).addrs['addrs']
                        except Exception as e:
                            # 生产上可以改为log
                            app.logger.error(e)
                            code = 418
                    else:
                        code=418
                else:
                    code = 418
            elif method == 'PUT':
                argsdict = json.loads(str(request.data, 'utf-8'))
                if 'form' in argsdict:
                    form = argsdict['form']
                    if 'type' in form and 'storeid' in form and 'goodsid' in form and 'size' in form and 'properties' in form and 'count' in form:
                        try:
                            if form['isdefault']==True:
                                for i,v in enumerate(buuser.addrs['addrs']):
                                    if v['isdefault']==True:
                                        buuser.addrs['addrs'][i]['isdefault']=False
                            buuser.addrs['addrs']=[form if i['id'] ==form['id'] else i for i in buuser.addrs['addrs']]
                            flag_modified(buuser,'addrs')
                            dbsession.commit()
                            data['data'] =  BUUSER.query.get(str(buuserid)).addrs['addrs']
                        except Exception as e:
                            # 生产上可以改为log
                            app.logger.error(e)
                            code = 418
                    else:
                        code=418
                else:
                    code = 418
            elif method == 'DELETE':
                # 删除资源
                argsdict=request.args.to_dict()
                if 'id' in argsdict :
                    for item in buuser.addrs['addrs']:
                        if item['id']==str(argsdict['id']):
                            buuser.addrs['addrs'].remove(item)
                            flag_modified(buuser,'addrs')
                            dbsession.commit()
                            break
                    data['data'] =  BUUSER.query.get(str(buuserid)).addrs['addrs']
                else:
                    code = 418
    else:
        code=418
        msg='只有移动端可以访问'
    return jsonify(code=code, data=data, msg=msg)






@app.route('/get_buuser_updateava', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_buuser_updateava():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'PUT':
        # 更新资源
        argsdict = json.loads(str(request.data, 'utf-8'))
        if 'form' in argsdict :
            form = argsdict['form']
            if 'newpic' in form :
                try:
                    newdata=BUUSER.query.get(str(g.user.id))
                    if newdata.ava!='' and newdata.ava is not None:
                        removeAva(newdata.ava)
                    newdata.ava=form['newpic']['url']
                    dbsession.commit()
                    data['data'] = form['newpic']['url']
                except Exception as e:
                    # 生产上可以改为log
                    app.logger.error(e)
            else:
                code = 418
        else:
            code = 418
    
    return jsonify(code=code, data=data, msg=msg)
