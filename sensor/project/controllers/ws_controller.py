import json
from project import sockets
from project.services.sensor import read
from gevent import sleep
from geventwebsocket.exceptions import WebSocketError

@sockets.route('/ws')
def ws(ws):
    while not ws.closed:
      try:
        data = read()
        json_string = json.dumps(data)

        ws.send(json_string)
        sleep(1)
      except WebSocketError, e:
        print("WebSocket: " + str(e))
        break

    return