#!/usr/bin/env python3
# -*- coding: utf-8 -*-
info=[]
err=[]
with open('station.txt','r',encoding="utf8") as f:
    data=f.readline()
    stations=data.split('@')
    for sta in stations:
        da= sta.split("|")
        if len(da)>2:
            info.append("{'name':'"+da[1]+"','value':'"+da[1]+","+da[2]+"'},")
            # print("|"+da[1]+"|:|"+da[2]+"|,")
        else:
            err.append(sta)
print(err)
with  open('stationsformat1.txt','w',encoding="utf8") as f:
    for inf in info:
        f.write(inf+"\n")