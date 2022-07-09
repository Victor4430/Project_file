#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app=Flask(__name__)
app.config.from_object('config')
db=SQLAlchemy(app)
dbsession=db.session
lm=LoginManager()
lm.init_app(app)
lm.login_view='c_login'
from App.view import *

# from App.model.res_seat import listdata
# listdata()
