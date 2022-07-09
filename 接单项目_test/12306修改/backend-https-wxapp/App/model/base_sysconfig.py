#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table



#类
class BASESYSCONFIG(db.Model):
    #表名
    __tablename__='base_sysconfig'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    #配置
    sysconf=db.Column(JSONB)
    #是否删除
    isdelete=db.Column(BOOLEAN)

    #将类实例数据转换为json格式
    #参数：用户实例
    def tojson(data):
        if type(data)==list:
            jsondata=[]
            for item in data:
                jsondata.append({
                    'sysconf':item.sysconf,
                    'id':item.id,
                    'isdelete':item.isdelete,
                    
                })
            return jsondata
        else:
            return {
                    'id':data.id,
                    'sysconf':data.sysconf,
                    'isdelete':data.isdelete,
                }

def listdata():
    db.create_all()
