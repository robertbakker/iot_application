import json
from project import app, db
from project.services import temperatures
from flask import request, Response
import requests


def kelvin_to_celsius(degrees):
  return degrees - 273

@app.route('/api/v0/weather/current', methods=['GET'])
def api_weather_current():
  api_key = app.config['WEATHER_API_KEY']
  url = 'http://api.openweathermap.org/data/2.5/find?lat=52.370216&lon=4.895168&cnt=1&appid=' + api_key
  r = requests.get(url)

  weather_data = json.loads(r.text)

  temp = round(kelvin_to_celsius(weather_data['list'][0]['main']['temp']), 1)

  return Response(response=json.dumps({'temperature': temp}),
                    mimetype="application/json")