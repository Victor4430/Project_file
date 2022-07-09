#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import  db
from sqlalchemy.dialects.postgresql import BOOLEAN,INTEGER,VARCHAR,JSONB,ARRAY
from sqlalchemy.sql import func,text
from sqlalchemy import Column,Table
from App.util.security import getNewID



#平台用户类
class BASEUSER(db.Model):
    #用户表名
    __tablename__='base_user'
    # flask-login相关
    #id，主键，采用uuid
    id=db.Column(VARCHAR,primary_key=True)
    #是否可用
    isenable=db.Column(BOOLEAN)
    #是否匿名
    isanonymous=db.Column(BOOLEAN)

    # 个人相关
    #用户名：可登录
    nickname=db.Column(VARCHAR)
    #用户姓名
    realname=db.Column(VARCHAR)
    # 工号：可登录
    staffcode=db.Column(VARCHAR)
    # 手机号：可登录
    mobile=db.Column(VARCHAR)
    #电子邮件：可登录
    email=db.Column(VARCHAR)
    #密码
    pw=db.Column(VARCHAR)
    # 组织机构码
    e0122=db.Column(VARCHAR)

    # 平台相关
    #角色
    roles=db.Column(JSONB)
    
    #组织机构
    dept=db.Column(JSONB)
    #职能组
    cgroup=db.Column(JSONB)
    
    # 单位
    unit_name=db.Column(VARCHAR)
    # 部门
    dep_name=db.Column(VARCHAR)
    # 处室
    office_name=db.Column(VARCHAR)

    # 微信相关
    # 全局唯一ID：可登录
    openid=db.Column(VARCHAR)
    # 微信名
    wxname=db.Column(VARCHAR)
    #微信号
    wxcode=db.Column(VARCHAR)
    #头像
    ava=db.Column(VARCHAR)
    #收货地址列表
    addrs=db.Column(JSONB)
    #购物车列表
    lovers=db.Column(JSONB)
    #位置
    tmpsite=db.Column(JSONB)
    #是否删除
    isdelete=db.Column(BOOLEAN)
    # 是否企业用户
    iscompany=db.Column(BOOLEAN)
    # 企业版购物车
    c_lovers=db.Column(JSONB)
    #企业信息
    c_info=db.Column(JSONB)
    #是否申请企业用户
    c_isapply=db.Column(BOOLEAN)
    privs=db.Column(JSONB)


    #使用flask-login模块需要实现的相关属性
    @property
    def is_authenticated(self):
        return self.isenable
    @property
    def is_active(self):
        return self.isenable
    @property
    def is_anonymous(self):
        return self.isanonymous  

    
    def get_id(self):
        return self.id 
    #将类实例数据转换为json格式
    #参数：用户实例
    def tojson(data):
        if type(data)==list:
            jsondata=[]
            for item in data:
                jsondata.append({
                    'id':item.id,
                    'isenable':item.isenable,
                    'isanonymous':item.isanonymous,
                    'nickname':item.nickname,
                    'realname':item.realname,
                    'staffcode':item.staffcode,
                    'mobile':item.mobile,
                    'email':item.email,
                    'e0122':item.e0122,
                    'roles':item.roles,
                    'dept':item.dept,
                    'cgroup':item.cgroup,
                    'wxname':item.wxname,
                    'wxcode':item.wxcode,
                    'ava':item.ava,
                    'addrs':item.addrs,
                    'lovers': item.lovers,
                    'tmpsite':item.tmpsite,
                    'isdelete':item.isdelete,
                    'openid':item.openid,
                    'iscompany':item.iscompany,
                    'c_lovers':item.c_lovers,
                    'c_info':item.c_info,
                    'c_isapply':item.c_isapply,
                    'unit_name':item.unit_name,
                    'dep_name':item.dep_name,
                    'office_name':item.office_name,

                })
            return jsondata
        else:
            return {
                'id':data.id,
                'isenable':data.isenable,
                'isanonymous':data.isanonymous,
                'nickname':data.nickname,
                'realname':data.realname,
                'staffcode':data.staffcode,
                'mobile':data.mobile,
                'email':data.email,
                'e0122':data.e0122,
                'roles':data.roles,
                'dept':data.dept,
                'cgroup':data.cgroup,
                'wxname':data.wxname,
                'wxcode':data.wxcode,
                'ava':data.ava,
                'addrs':data.addrs,
                'lovers': data.lovers,
                'tmpsite':data.tmpsite,
                'isdelete':data.isdelete,
                'openid':data.openid,
                'iscompany':data.iscompany,
                'c_lovers':data.c_lovers,
                'c_info':data.c_info,
                'c_isapply':data.c_isapply,
                'unit_name':data.unit_name,
                'dep_name':data.dep_name,
                'office_name':data.office_name,
                }



# from flask import json    
def listdata():
    db.create_all()

    


