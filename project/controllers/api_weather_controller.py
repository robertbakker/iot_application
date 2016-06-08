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


@app.route('/api/v0/weather/lat_lng', methods=['GET'])
def api_weather_lat_lng():
  lat = request.args.get('lat')
  lng = request.args.get('lng')

  api_key = app.config['WEATHER_API_KEY']
  url = 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + 'cnt=1&appid=' + api_key
  r = requests.get(url)

  weather_data = json.loads(r.text)

  temp = round(kelvin_to_celsius(weather_data['list'][0]['main']['temp']), 1)
  name = weather_data['list'][0]['name']

  return Response(response=json.dumps({'temperature': temp, 'name': name}),
                    mimetype="application/json")

