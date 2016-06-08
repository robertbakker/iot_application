import json
from project import app, db
from project.services import temperatures
from flask import request, Response

def _json_response(data):
  json_data = json.dumps(data)
  return Response(response=json_data,
                    mimetype="application/json")

@app.route('/api/v0/temperatures', methods=['GET', 'POST'])
def api_temperatures():
  if request.method == 'GET':
    temps = temperatures.get_all()
    return _json_response([i.serialize for i in temps])

  if request.method == 'POST':
    value = request.form['temperature']
    temperatures.add(float(value))
    return _json_response({
      'success': True
    }) 

@app.route('/api/v0/temperatures/per_hour', methods=['GET'])
def api_temperatures_per_hour():
  temps = temperatures.get_average_per_hour()
  result = []

  for temp in temps:
    result.append({
        'value': temp.average,
        'hour': temp.hour
      })

  return _json_response(result)

@app.route('/api/v0/temperatures/per_day', methods=['GET'])
def api_temperatures_per_day():
  temps = temperatures.get_average_per_day()
  result = []

  for temp in temps:
    result.append({
        'value': temp.average,
        'day': temp.day
      })

  return _json_response(result)
