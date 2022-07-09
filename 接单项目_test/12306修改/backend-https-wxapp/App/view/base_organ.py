#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from  App import dbsession,  app
import asyncio
from flask import json, jsonify, g, request
from  App.model.base_organ import BASEORGAN
from  App.util.security import getNewID,MD5
from  App.model.base_role import BASEROLES



@app.route('/get_organ_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_organ_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict=request.args.to_dict()
        
        if 'action' in argsdict and argsdict['action'] == 'get':
            if 'filter' in argsdict and argsdict['filter'] == '厦航本部':
                organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
                a=list(filter(lambda x: x['organ_id'] =='0005', organlist))[0]
                inittree={'id': a['organ_id'],'label': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
                organtree=buildOrganTree(inittree,organlist)
                data['data'] = organtree
            elif 'filter' in argsdict and argsdict['filter'] == '信息部':
                organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
                a=list(filter(lambda x: x['organ_id'] =='2160', organlist))[0]
                inittree={'id': a['organ_id'],'label': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
                organtree=buildOrganTree(inittree,organlist)
                data['data'] = organtree
            else:
                organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
                inittree={'id': '00000','label': '厦门航空有限公司','sort_no':'000','full_path':'厦门航空有限公司','organ_code':'00000','children': []}
                organtree=buildOrganTree(inittree,organlist)
                print(organtree)
                data['data'] = organtree
        
        else:
            code = 418
    
    return jsonify(code=code, data=data, msg=msg)

def buildOrganTree(tree,organlist):
    if tree['id']=='00000':
        tmplist=filter(lambda x: x['superior_organ'] is None, organlist)
        for a in tmplist:
            b={'id': a['organ_id'],'label': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            tree['children'].append(buildOrganTree(b,organlist))
    else:
        tmplist=filter(lambda x: x['superior_organ'] ==tree['id'], organlist)
        for a in tmplist:
            b={'id': a['organ_id'],'label': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            tree['children'].append(buildOrganTree(b,organlist))
    return tree


@app.route('/get_organ_select_data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_organ_select_data():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    method = request.method
    if method == 'GET':
        # GET方法需要判断action参数，action可以是get/handle，用于区分获取资源请求和操作请求
        argsdict=request.args.to_dict()
        
        if 'action' in argsdict and argsdict['action'] == 'get':
            organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
            a={}
            # 判断权限个人
            if g.user.roles==[] or g.user.roles is None:
                a=list(filter(lambda x: x['organ_code'] ==g.user.e0122, organlist))[0]
            else:
                # 角色不为空，判断角色所拥有的权限
                roles = (
                    dbsession.query(BASEROLES)
                    .filter(BASEROLES.id.in_(g.user.roles))
                    .all()
                )
                privs = []
                for role in roles:
                    privs = privs + list(role.privs)
                if "组织机构-全部" in privs:
                    if 'filter' in argsdict and argsdict['filter'] == '厦航本部':
                        a=list(filter(lambda x: x['organ_id'] =='0005', organlist))[0]
                    else:
                        a=list(filter(lambda x: x['organ_id'] =='2160', organlist))[0]
                    
                else:
                    a=list(filter(lambda x: x['organ_code'] ==g.user.e0122, organlist))[0]
            inittree={'id': a['organ_id'],'title': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            organtree=buildOrganSelectTree(inittree,organlist)
            data['data'] = [organtree]
            # if 'filter' in argsdict and argsdict['filter'] == '厦航本部':
            #     organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
            #     a=list(filter(lambda x: x['organ_id'] =='0005', organlist))[0]
            #     inittree={'id': a['organ_id'],'title': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            #     organtree=buildOrganSelectTree(inittree,organlist)
            #     data['data'] = [organtree]
            # elif 'filter' in argsdict and argsdict['filter'] == '信息部':
            #     organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
            #     a=list(filter(lambda x: x['organ_id'] =='2160', organlist))[0]
            #     inittree={'id': a['organ_id'],'title': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            #     organtree=buildOrganSelectTree(inittree,organlist)
            #     data['data'] = [organtree]
            # else:
            #     organlist=json.loads(json.dumps(dbsession.query(BASEORGAN).all(), default=BASEORGAN.tojson))
            #     inittree={'id': '00000','title': '厦门航空有限公司','sort_no':'000','full_path':'厦门航空有限公司','organ_code':'00000','children': []}
            #     organtree=buildOrganSelectTree(inittree,organlist)
            #     print(organtree)
            #     data['data'] = [organtree]
        
        else:
            code = 418
    
    return jsonify(code=code, data=data, msg=msg)

def buildOrganSelectTree(tree,organlist):
    if tree['id']=='00000':
        tmplist=filter(lambda x: x['superior_organ'] is None, organlist)
        for a in tmplist:
            b={'id': a['organ_id'],'title': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            tree['children'].append(buildOrganSelectTree(b,organlist))
    else:
        tmplist=filter(lambda x: x['superior_organ'] ==tree['id'], organlist)
        for a in tmplist:
            b={'id': a['organ_id'],'title': a['organ_name'],'sort_no':a['sort_no'],'full_path':a['full_path'],'organ_code':a['organ_code'],'children': [],}
            tree['children'].append(buildOrganSelectTree(b,organlist))
    return tree