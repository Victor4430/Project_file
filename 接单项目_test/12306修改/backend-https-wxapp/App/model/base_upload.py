#!/usr/bin/env python3
# -*- coding: utf-8 -*-
__wdate__='2021-06-26'

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID

#类
class BASEUPLOAD(db.Model):
    #用户表名
    __tablename__='base_upload'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    name=db.Column(VARCHAR)
    url=db.Column(VARCHAR)
    
    # 平台相关
    # 创建人
    create_user=db.Column(VARCHAR(50))
    create_userid=db.Column(VARCHAR(50))
    # 创建时间
    create_date=db.Column(VARCHAR(50))
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
                    'url':item.url,
                    'name':item.name,
                    
                    'isdelete':item.isdelete,
                    'create_user':item.create_user,
                    'create_date':item.create_date,
                    'create_userid':item.create_userid,

                })
            return jsondata
        else:
            return {
                'id':data.id,
                'url':data.url,
                'name':data.name,
                
                'isdelete':data.isdelete,
                'create_user':data.create_user,
                'create_date':data.create_date,
                'create_userid':data.create_userid,
                }
# from flask import json    
def listdata():
    db.create_all()

    


