#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY,NUMERIC
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table



#系统更新日志类
class BASERELEASELOG(db.Model):
    #表名
    __tablename__='base_releaselog'
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    #版本
    version=db.Column(VARCHAR)
    #标题
    title=db.Column(VARCHAR)
    #更新时间
    releasedate=db.Column(VARCHAR)
    #更新内容列表
    msg=db.Column(ARRAY(VARCHAR))
    # 是否里程碑
    trophy=db.Column(BOOLEAN)
    # 颜色
    color=db.Column(VARCHAR)
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
                    'version':item.version,
                    'title':item.title,
                    'releasedate':item.releasedate  ,
                    'msg':[x for x in item.msg],
                    'trophy':item.trophy,
                    'color':item.color,
                    'isdelete':item.isdelete,
                    
                })
            return jsondata
        else:
            return {
                    'id':data.id,
                    'version':data.version,
                    'title':data.title,
                    'releasedate':data.releasedate  ,
                    'msg':[x for x in data.msg],
                    'trophy':data.trophy,
                    'color':data.color,
                    'isdelete':data.isdelete,
                }

def listdata():
    db.create_all()
