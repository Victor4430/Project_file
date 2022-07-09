# -*- coding: utf-8 -*-
import os
import uuid
import platform,datetime
from flask import json, jsonify, g, request,send_from_directory
from  App import dbsession,  app
from werkzeug.utils import secure_filename
from App.model.base_upload import BASEUPLOAD
from  App.util.security import getNewID

if platform.system() == "Windows":
    slash = '\\'
else:
    platform.system()=="Linux"
    slash = '/'
UPLOAD_FOLDER = app.config['UPLOAD_FOLDER']
ALLOW_EXTENSIONS = set(['jpg', 'png', 'jpeg','doc','docx'])
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 判断文件后缀是否在列表中
def allowed_file(filename):
    return '.' in filename and  filename.rsplit('.', 1)[1].lower() in ALLOW_EXTENSIONS

@app.route('/get_uploadfile_data',methods=['GET','POST'])
def upload_file():
    # 初始化返回数据，规范为code/data/msg
    code = 200
    data = {
    }
    msg = ''
    if request.method =='POST':
        #判断文件夹是否存在，如果不存在则创建
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        else:
            pass
        #获取post过来的文件名称，从name=file参数中获取
        file = request.files['file']

        if file and (allowed_file(file.filename) or file.content_type=='image/png'):
            # secure_filename方法会去掉文件名中的中文
            oldfilename=file.filename
            filename = secure_filename(file.filename)
            if filename=='blob':
                filename='blob.png'
            #因为上次的文件可能有重名，因此使用uuid保存文件
            new_file_name=''
            if len(filename.rsplit('.', 1))==1:
                new_file_name = str(uuid.uuid4()) + '.' + filename.rsplit('.', 1)[0]
            else:
                new_file_name = str(uuid.uuid4()) + '.' + filename.rsplit('.', 1)[1]
            try:
                file.save(os.path.join(app.config['UPLOAD_FOLDER'],new_file_name))
                id = getNewID()
                # 按时间自动创建编号
                nowdate=datetime.datetime.now()
                newdata = BASEUPLOAD(id=str(id),name=oldfilename, url=str(new_file_name), create_user=g.user.realname,create_userid=str(g.user.id),create_date=nowdate.strftime('%Y-%m-%d %H:%M:%S'),
                    isdelete=False)
                dbsession.add(newdata)
                dbsession.commit()
                # base_path = os.getcwd()
                # file_path = base_path + slash + app.config['UPLOAD_FOLDER'] + slash + new_file_name
                data['data'] = {
                    'oldname':oldfilename,
                    'name':str(id),
                    'url':app.config['SERVER_ADDR']+'/getfiles?id='+str(id),
                    'percentage': 100,
                    'status': "finished"
                }
            except Exception as e:
                print(e)
                app.logger.error(e)
                code=500
        else:
            code = 418
            msg="文件格式有误！"
    return jsonify(code=code, data=data, msg=msg)


@app.route('/getfiles',methods=['GET'])
def getfiles():
    #测试用，后期通过nginx直接分发
    if request.method == 'GET':
        argsdict=request.args.to_dict()
        if 'id' in argsdict:
            base_path = os.getcwd()
            newdata = BASEUPLOAD.query.get(str(argsdict['id']))
            if newdata is not None:
                try:
                    return send_from_directory(base_path + slash + app.config['UPLOAD_FOLDER'] + slash ,newdata.url)
                except Exception as e:
                    app.logger.error(e)
                    return 'None'
    return 'None'

@app.route('/removefiles',methods=['DELETE'])
def removefile():
    code = 200
    data = {
    }
    msg = ''
    if request.method == 'DELETE':
        argsdict=request.args.to_dict()
        if 'id' in argsdict:
            base_path = os.getcwd()
            try:
                newdata = BASEUPLOAD.query.get(str(argsdict['id']))
                if newdata is not None:
                    fileload=base_path + slash + app.config['UPLOAD_FOLDER'] + slash +newdata.url
                    if os.path.exists(fileload):
                        os.remove(fileload)
                    else:
                        code=418
                        msg='文件不存在！'
                dbsession.delete(newdata)
                dbsession.commit()
                # return send_from_directory(base_path + slash + app.config['UPLOAD_FOLDER'] + slash , argsdict['name'])
            except Exception as e:
                print(e)
                app.logger.error(e)
                code=418
                msg='文件删除失败'
        else:
            code=418
    else:
        code=418
    return jsonify(code=code, data=data, msg=msg)


def removeAva(initid):
    code = 200
    msg=''
    base_path = os.getcwd()
    ids=initid.split('=')
    if len(ids)>1:
        id=ids[1]
        try:
            fileload=base_path + slash + app.config['UPLOAD_FOLDER'] + slash +id
            if os.path.exists(fileload):
                os.remove(fileload)
            else:
                code=418
                msg='文件不存在！'
            # return send_from_directory(base_path + slash + app.config['UPLOAD_FOLDER'] + slash , argsdict['name'])
        except Exception as e:
            print(e)
            app.logger.error(e)
            code=418
            msg='文件删除失败'
       
    return code,msg