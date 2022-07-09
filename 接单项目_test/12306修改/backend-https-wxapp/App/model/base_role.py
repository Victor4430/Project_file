#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID



#类
class BASEROLES(db.Model):
    #表名
    __tablename__='base_roles'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    #名称：功能权限/数据权限
    name=db.Column(VARCHAR)
    #说明
    desc=db.Column(VARCHAR)
    #权限数据树
    privs=db.Column(JSONB)
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
                    'desc':item.desc,
                    'privs':item.privs,
                    'isdelete':item.isdelete
                })
            return jsondata
        else:
            return {
                    'id':data.id,
                    'name':data.name,
                    'desc':data.desc,
                    'privs':data.privs,
                    'isdelete':data.isdelete
                }

def listdata():
    db.create_all()
    
    print(db.session.query(BASEROLES).all())
