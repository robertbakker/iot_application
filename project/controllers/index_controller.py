from project import app
from flask import render_template, request
import re

@app.route('/')
def index():
    hostname = request.url_root
    api_url = hostname + 'api/v0'
    websocket_url = 'ws://' + re.sub('^(https?|ftp)://', '', hostname) + 'ws'
    return render_template('index.html', api_url = api_url, websocket_url = websocket_url)