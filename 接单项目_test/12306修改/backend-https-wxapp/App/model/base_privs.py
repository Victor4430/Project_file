#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID



#类
class BASEPRIVS(db.Model):
    #表名
    __tablename__='base_privs'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    #名称：功能权限/数据权限
    name=db.Column(VARCHAR)
    #权限数据树
    value=db.Column(JSONB)
    #是否删除
    isdelete=db.Column(BOOLEAN)

    #将类实例数据转换为json格式
    #参数：用户实例
    def tojson(data):
        if type(data)==list:
            jsondata=[]
            for item in data:
                jsondata.append({
                    'id':item.id,
                    'name':item.name,
                    'value':item.value,
                    'isdelete':item.isdelete
                    
                })
            return jsondata
        else:
            return {
                    'id':data.id,
                    'name':data.name,
                    'value':data.value,
                    'isdelete':data.isdelete
                }

def listdata():
    db.create_all()
    newdata=BASEPRIVS(id=getNewID(),name='功能权限',value={
	"title": "功能权限",
	"expand": True,
	"nodeKey": 0,
	"children": []},isdelete=False)
    db.session.add(newdata)
    db.session.commit()
    newdata=BASEPRIVS(id=getNewID(),name='数据权限',value={
	"title": "数据权限",
	"expand": True,
	"nodeKey": 0,
	"children": []},isdelete=False)
    db.session.add(newdata)
    db.session.commit()
    print(db.session.query(BASEPRIVS).all())
