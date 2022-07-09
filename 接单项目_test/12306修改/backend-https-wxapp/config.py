#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#表单验证csrf加密配置
CSRF_ENABLED=True
#会话密钥
SECRET_KEY='A0Zr98j/0R~jwewerwjhgghggejdke!muesdKYd],/?eRT'
#PostgreSQL数据库连接配置
SQLALCHEMY_DATABASE_URI='postgresql+psycopg2://ticket12306_adm:password@localhost:5432/ticket12306db?client_encoding=utf8'
#数据库连接池大小
SQLALCHEMY_POOL_SIZE=20
#数据库连接超时时间
SQLALCHEMY_POOL_TIMEOUT=None
#数据库连接回收时间
SQLALCHEMY_POOL_RECYCLE=3600
SQLALCHEMY_TRACK_MODIFICATIONS=True
#上传文件所在文件夹
UPLOAD_FOLDER='uploadfiles'
#上传文件最大10M
MAX_CONTENT_LENGTH = 10 * 1024 * 1024
#应用后端部署IP或域名,在上传文件后返回文件路径用
SERVER_ADDR="http://127.0.0.1:5000"
APPID=''
# 小程序会话保持时长
WX_SESSION_OVERTIME=1440
