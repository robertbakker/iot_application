import sys
from project import app
from project.services import temperatures

measure = False

if len(sys.argv) == 4:
  host = sys.argv[1]
  port = sys.argv[2]
  measure_interval = float(sys.argv[3])
  measure = True
else:
  print('usage: sudo ./app.py <host> <port> <measure interval in seconds>')
  print('example: sudo ./app.py 0.0.0.0 8000 1 - Open server on 0.0.0.0:8000 and measure every second')
  host = '0.0.0.0'
  port = 8000
  measure_interval = 60

if __name__ == "__main__":

  if measure:
    temperatures.start_measure_every(measure_interval)

  from gevent.pywsgi import WSGIServer
  from geventwebsocket.handler import WebSocketHandler
  http_server = WSGIServer((host,int(port)), app, handler_class=WebSocketHandler)
  print("Server started on " + host + ":" + str(port))
  http_server.serve_forever()
