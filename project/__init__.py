from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_sockets import Sockets

import os
app = Flask('project', static_folder = os.getcwd() + '/public', static_url_path = '/static')
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1/iot_application'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['WEATHER_API_KEY'] = 'a3336ac7ec220890b31af7905df0362c'
db = SQLAlchemy(app)
sockets = Sockets(app)

from project.controllers import *