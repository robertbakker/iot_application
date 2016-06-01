import Adafruit_DHT
SENSOR_TYPE = Adafruit_DHT.AM2302
SENSOR_PIN = 4

def read():
  humidity, temperature = Adafruit_DHT.read_retry(SENSOR_TYPE, SENSOR_PIN)
  if humidity is not None and temperature is not None:
    return {
      'temperature': round(temperature, 1),
      'humidity': round(humidity,1)
    }
  return {
    'message': 'Could not read the sensor'
  }