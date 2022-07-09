#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import uuid
import hmac
import hashlib
import datetime
import random,string
from Crypto.Cipher import AES
from flask import json
import types
from flask_login import decode_cookie,encode_cookie
# 获取uuid


def getNewID():
    return uuid.uuid1()

# 获取hmac加密字符串


def getHMACStr(data, key):
    newhmac = hmac.new(bytes(key, 'utf-8'), bytes(data, 'utf-8'), hashlib.md5)
    return newhmac.hexdigest()

#获取8位密码，包含数字/字母/下划线
def getNewPw():
    src = string.ascii_letters + string.digits
    list_passwd_all = random.sample(src, 5)
    list_passwd_all.extend(random.sample(string.digits, 1)) 
    list_passwd_all.extend(random.sample(string.ascii_lowercase, 1))
    list_passwd_all.extend(random.sample('_', 1))
    random.shuffle(list_passwd_all)
    if list_passwd_all[0] in string.digits or list_passwd_all[0]=='_':
        i=1
        while i>0:
            if list_passwd_all[i] not in string.digits and list_passwd_all[i] != '_':
                tmp=list_passwd_all[i]
                list_passwd_all[i]=list_passwd_all[0]
                list_passwd_all[0]=tmp
                break
            else:
                i=i+1
    return ''.join(list_passwd_all)


def getEsbHeaderValue(systemId, key, serviceId, operationName, version, timeOut):
    esbHeader = {
        'SerialNo': '',
        'SystemId': '',
        'VerifiCode': '',
        'ServiceId': '',
        'OperationName': '',
        'Version': '',
        'TimeOut': '',
        'StartTime': ''
    }
    nowtime = datetime.datetime.now()
    d1 = nowtime.strftime('%Y-%m-%d %H:%M:%S %f')[:-3]
    d2 = nowtime.strftime('%Y%m%d%H%M%S')
    esbHeader['SerialNo'] = systemId + d2 + \
        str(random.randint(0, 9999)).rjust(4, '0')
    esbHeader['SystemId'] = systemId
    esbHeader['VerifiCode'] = getHMACStr(systemId + d1, key)
    esbHeader['ServiceId'] = serviceId
    esbHeader['OperationName'] = operationName
    esbHeader['Version'] = version
    esbHeader['TimeOut'] = timeOut
    esbHeader['StartTime'] = d1
    # esbHeaderstr = '{'+'"SerialNo":"'+esbHeader['SerialNo']+'","SystemId":"'+esbHeader['SystemId']+'","VerifiCode":"' + \
    #     esbHeader['VerifiCode']+'","ServiceId":"'+esbHeader['ServiceId'] + \
    #     '","OperationName":"' + esbHeader['OperationName']+'","Version":"'+esbHeader['Version']+\
    #     '","TimeOut":"'+esbHeader['TimeOut']+'","StartTime":"'+esbHeader['StartTime']+'"}'
    esbHeaderstr = '{'+'"SerialNo":"'+esbHeader['SerialNo']+'","SystemId":"'+esbHeader['SystemId']+'","VerifiCode":"' + \
        esbHeader['VerifiCode']+'","ServiceId":"'+esbHeader['ServiceId'] + \
        '","OperationName":"' + esbHeader['OperationName']+'","Version":"'+esbHeader['Version']+\
        '","TimeOut":"'+esbHeader['TimeOut']+'","StartTime":"'+esbHeader['StartTime']+'"}'
    return esbHeaderstr



#功能：md5加密
#参数：需要加密的字段
#返回：加密字段
def MD5(md5str):
    
    if type(md5str) is str:
        m=hashlib.md5()
        m.update(md5str.encode("utf8"))
        return m.hexdigest()
    else:
        return ''

# 会话加密，返回会话认证token
def sessionEncode(id):
    nowtime = datetime.datetime.now()
    d2 = nowtime.strftime('%Y%m%d%H%M%S')
    return encode_cookie(str(id)+'='+d2)
# 会话token认证
def sessionDecode(token,minutes=1440):
    data=decode_cookie(token)
    if data is not None:
        id=data.split('=')[0]
        lastdate=data.split('=')[1]
        if (datetime.datetime.now()-datetime.datetime.strptime(lastdate, "%Y%m%d%H%M%S")).total_seconds()/60 <minutes:
            return id
    return False