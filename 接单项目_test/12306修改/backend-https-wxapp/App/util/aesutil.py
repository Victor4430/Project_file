# -*- coding=utf-8-*-

from Crypto.Cipher import AES
import os
from Crypto import Random
import base64

"""
aes加密算法
padding : PKCS5
"""

class AESUtil:

    __BLOCK_SIZE_16 = BLOCK_SIZE_16 = AES.block_size

    @staticmethod
    def encryt(str, key):
        key=AESUtil.formatEncryptStr(key)
        cipher = AES.new(key, AES.MODE_ECB)
        x = AESUtil.__BLOCK_SIZE_16 - (len(str) % AESUtil.__BLOCK_SIZE_16)
        if x != 0:
            str = str + chr(x)*x
        msg = cipher.encrypt(bytes(str,'utf-8'))   
        return msg.hex()
        msg = base64.urlsafe_b64encode(msg)
        return msg
    @staticmethod
    def formatEncryptStr(text):
        if len(text) > 16:
            return text[0:15]
        return text.ljust(16, b'0')
    @staticmethod
    def decrypt(enStr, key):
        cipher = AES.new(key, AES.MODE_ECB)
        enStr += (len(enStr) % 4)*"="
        decryptByts = base64.urlsafe_b64decode(enStr)
        msg = cipher.decrypt(decryptByts)
        paddingLen = ord(msg[len(msg)-1])
        return msg[0:-paddingLen]
