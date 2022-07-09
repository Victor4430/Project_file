#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import dbsession,app
from App.util.security import getNewPw
from flask_login import login_required
from .login import load_user
import asyncio
from App.model.base_role import BASEROLES
from flask import json,jsonify,g,render_template,request
from .base_organ import *
from .base_privs import *
from .base_roles import *
from .base_sysconfig import *
from .base_user import *
from .base_release_log import *
#openAPI
#业务视图
# from .buuser import*
from .uploadfile import*
from .task import*
from .res_order import*
from .res_search import*
from .res_seat import*



#平台主页,直接返回单页应用
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')



#获取用户信息：用户信息/角色信息/权限信息
@app.route('/get_userinfo',methods=['GET','POST'])
def getUserInfo():
    #初始化返回参数
    code=200
    msg=''
    data={
        'id':'',
        'realname':'',
        'staffcode':'',
        'roles':[],
        'access':[],
        'avator':''
    }

    data['id']=g.user.id
    data['staffcode']=g.user.staffcode
    data['realname']=g.user.realname
    data['roles']=g.user.roles
    data['avator']=g.user.ava
    allprivs=[]
    roledatas=json.loads(json.dumps(dbsession.query(
                BASEROLES).all(), default=BASEROLES.tojson))
    for role in g.user.roles:
        privs=list(filter(lambda x:x['id']==role,roledatas))
        if privs!=[]:
            allprivs=allprivs+privs[0]['privs']
    data['access']=list(set(allprivs))
    data['s']="kkjhsdfs"
    return jsonify(code=code,data=data,msg=msg)
        

#获取用户令牌，登录成功后将回传工号作为令牌用户
# @app.route('/get_table_data',methods=['GET','POST'])
# def get_table_data():
#     code=200
#     data=[
#         {
#             'name':'hxb',
#             'email':'123@abc',
#             'createTime':'20180105'
#         },
#         {
#             'name':'shuman',
#             'email':'1234@abcd',
#             'createTime':'20181105'
#         },
#     ]
#     msg=''
#     return jsonify(code=code,data=data,msg=msg)

    
# @app.route('/hello')
# @login_required
# def hello():
#     from App.model.base_user import BASEUSER
    # post数据在request.data里
    #insert操作
    #admin = User.query.filter_by(username='admin').first()
    #dbsession.add(admin)
    #update操作
    #da=BASEUSER.query.filter_by(staffcode='20088').first()
    #da.mobile='15759277585'
    #dbsession.commit()
    #排序
    #User.query.order_by(User.username).all()
    # from sqlalchemy import case
    # offices_query.order_by(case(((ResourcesOffice.status =='1',1),(ResourcesOffice.modify_user.is_(None),2),(ResourcesOffice.status =='3',3),(ResourcesOffice.status.is_(None),4),(ResourcesOffice.status =='2',5))))
    # 上面的case里面是一个元组，然后(ResourcesOffice.status =='1',1)，后面的1代表的是顺序，前面的是筛选条件，下面以此类推。
    # 多字段排序可以用上面的方法，如果只按照一个字段来排序，可以用下面的方法。
    # from sqlalchemy import case
    # officees_query.order_by(case(value=ResourcesOffice.status, where={'1': 1, '3':2, '2': 3}))
    # 这样就可以实现自定义排序。
    #过滤
    #user = User.query.filter_by(username='joe').first()
    # User.query.get(1)
    #user = User.query.filter(User.username=='ethan').first()
    #分页方法
    #分页方法可以采用 limit() 和 offset() 方法，比如从第 3 条记录开始取(注意是从 0 开开始算起)，并最多取 1 条记录
    #users = User.query.limit(1).offset(3)
    #原生分页可采用以下方法
    #page = request.args.get('page', 1, type=int)    
    #pagination = Post.query.order_by(Post.timestamp.desc()).paginate(page,per_page=current_app.config['ARTISAN_POSTS_PER_PAGE'],error_out=False)
    #posts = pagination.items
    #return render_template('index.html', form=form, posts=posts,        
    # r=BASEUSER.query.all()
    # return jsonify(data=json.dumps(r,default=BASEUSER.tojson))

@app.route('/get_newpw', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_newpw(): 
    code = 200
    data = {
    }
    data['data'] = getNewPw()
    msg = ''
    return jsonify(code=code, data=data, msg=msg)




# @app.route('/get_tree_select_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
# def get_tree_select_data(): 
#     code = 200
#     data = {
#     }
#     msg = ''
    

#     data['data']= [
#                     {
#                         'id': 'a',
#                         'title': 'a',
#                         'children': [
#                         {
#                             'id': 'a1',
#                             'title': 'a-1',
#                             'children': [
#                             {
#                                 'id': 112,
#                                 'title': '1-1-2'
#                             },
#                             {
#                                 'id': '113',
#                                 'title': 'a-1-2'
#                             },
#                             {
#                                 'id': 'a13',
#                                 'title': 'a-1-3'
#                             },
#                             {
#                                 'id': 'a14',
#                                 'title': 'a-1-4'
#                             }
#                             ]
#                         },
#                         {
#                             'id': 'a2',
#                             'title': 'a-2',
#                             'children': [
#                             {
#                                 'id': 'a21',
#                                 'title': 'b-2-1'
#                             }
#                             ]
#                         }
#                         ]
#                     }
#                     ]
#     return jsonify(code=code, data=data, msg=msg)


# @app.route('/get_drag_list', methods=['GET', 'POST', 'PUT', 'DELETE'])
# def get_drag_list(): 
#     code = 200
#     data = {
#     }
#     msg = ''
    

#     data['data']= [
#                     {"name":"dfgd"},
#                     {"name":"ytyuy"},
#                     {"name":"kjreterhsdf"},
#                     {"name":"kjhghgsdf"},
#                     {"name":"nnn"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},
#                     {"name":"kjhmmmmmmsdf"},

#                     ]
#     return jsonify(code=code, data=data, msg=msg)
    