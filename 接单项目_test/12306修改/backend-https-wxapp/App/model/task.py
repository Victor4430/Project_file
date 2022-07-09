#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'数据模型'
__author__='黄洵斌'
__wdate__='2022-03-26'

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID

#类
class TASK(db.Model):
    #用户表名
    __tablename__='task'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    username=db.Column(VARCHAR)
    name=db.Column(VARCHAR)
    passwd=db.Column(VARCHAR)
    passengers=db.Column(JSONB)
    t_names=db.Column(JSONB)
    fs=db.Column(VARCHAR)
    ts=db.Column(VARCHAR)
    seat_rule=db.Column(JSONB)
    date=db.Column(VARCHAR)
    train_rule=db.Column(VARCHAR)
    auto_search_times=db.Column(INTEGER)
    auto_search_fre=db.Column(INTEGER)
    
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
                    'username':item.username,
                    'name':item.name,
                    'passwd':item.passwd,
                    'passengers':item.passengers,
                    't_names':item.t_names,
                    'fs':item.fs,
                    'ts':item.ts,
                    'seat_rule':item.seat_rule,
                    'date':item.date,
                    'train_rule':item.train_rule,
                    'auto_search_times':item.auto_search_times,
                    'auto_search_fre':item.auto_search_fre,
                    
                    'isdelete':item.isdelete,
                    'create_user':item.create_user,
                    'create_date':item.create_date,
                    'create_userid':item.create_userid,

                })
            return jsondata
        else:
            return {
                'id':data.id,
                'username':data.username,
                'name':data.name,
                'passwd':data.passwd,
                'passengers':data.passengers,
                't_names':data.t_names,
                'fs':data.fs,
                'ts':data.ts,
                'seat_rule':data.seat_rule,
                'date':data.date,
                'train_rule':data.train_rule,
                'auto_search_times':data.auto_search_times,
                'auto_search_fre':data.auto_search_fre,
                
                'isdelete':data.isdelete,
                'create_user':data.create_user,
                'create_date':data.create_date,
                'create_userid':data.create_userid,
                }
# from flask import json    
def listdata():
    db.create_all()

    


