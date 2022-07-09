#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY,NUMERIC
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table



#类
class BASEORGAN(db.Model):
    #表名
    __tablename__='base_organ'
    #id，主键
    organ_id=db.Column(VARCHAR,primary_key=True)
    #组织机构编号
    organ_code=db.Column(VARCHAR)
    #组织机构名称
    organ_name=db.Column(VARCHAR)
    # 父节点
    superior_organ=db.Column(VARCHAR)
    # 排序
    sort_no=db.Column(VARCHAR)
    # 全路径
    full_path=db.Column(VARCHAR)
    

    #将类实例数据转换为json格式
    #参数：用户实例
    def tojson(data):
        if type(data)==list:
            jsondata=[]
            for item in data:
                jsondata.append({
                    'organ_id':item.organ_id,
                    'organ_code':item.organ_code,
                    'organ_name':item.organ_name,
                    'superior_organ':item.superior_organ,
                    'sort_no':item.sort_no,
                    'full_path':item.full_path,
                })
            return jsondata
        else:
            return {
                'organ_id':data.organ_id,
                'organ_code':data.organ_code,
                'organ_name':data.organ_name,
                'superior_organ':data.superior_organ,
                'sort_no':data.sort_no,
                'full_path':data.full_path,
                }

def listdata():
    db.create_all()
