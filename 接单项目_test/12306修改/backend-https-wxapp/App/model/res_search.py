#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'数据模型'
__author__='郑创豪'
__wdate__='2022-03-26'

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID

#类
class RES_SEARCH(db.Model):
    #用户表名
    __tablename__='res_search'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    task_id=db.Column(VARCHAR)
    cols=db.Column(JSONB)
    datas=db.Column(JSONB)
    
    # 平台相关
    # 创建人
    create_user=db.Column(VARCHAR)
    create_userid=db.Column(VARCHAR)
    # 创建时间
    create_date=db.Column(VARCHAR)
    #是否删除
    isdelete=db.Column(BOOLEAN) 

    @staticmethod
    def foreignRefs():
        # return {
        #     "company_name":["company_id",COMPANY,"id","name"],
        # }
        return {}

    #将类实例数据转换为json格式
    #参数：用户实例
    def tojson(data):
        if type(data)==list:
            jsondata=[]
            for item in data:
                jsondata.append({
                    'id':item.id,
                    'task_id':item.task_id,
                    'cols':item.cols,
                    'datas':item.datas,
                    
                    'isdelete':item.isdelete,
                    'create_user':item.create_user,
                    'create_date':item.create_date,
                    'create_userid':item.create_userid,

                })
            return jsondata
        else:
            return {
                'id':data.id,
                'task_id':data.task_id,
                'cols':data.cols,
                'datas':data.datas,
                
                'isdelete':data.isdelete,
                'create_user':data.create_user,
                'create_date':data.create_date,
                'create_userid':data.create_userid,
                }
# from flask import json    
def listdata():
    db.create_all()

    


