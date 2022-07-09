#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from App import app
# from gevent.pywsgi import WSGIServer
# from gevent import monkey
# monkey.patch_all()
if __name__=='__main__':
    app.run(debug=True)#本地调试
    # http = WSGIServer(('0.0.0.0', 5000), app,keyfile='test.com.cn.key',certfile='test.com.cn.crt') #生产部署
    # http.serve_forever() #生产部署