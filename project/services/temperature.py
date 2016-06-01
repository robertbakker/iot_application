from project import db
from project.models.temperature import Temperature
from project.services.sensor import read
from gevent import sleep
from threading import Thread

class Temperatures(object):
  def get_all(self):
    return Temperature.query.all()

  def get_average_per_day(self):
    temps = db.session.query(
        Temperature,
        db.func.round(db.func.avg(Temperature.value), 1).label('average'),
        db.func.group_concat(
          db.func.year(Temperature.created_at).distinct(),"-",
          db.func.lpad(db.func.month(Temperature.created_at),2,"0"),"-",
          db.func.lpad(db.func.day(Temperature.created_at), 2, "0")
        ).label('day')).group_by(db.func.day(Temperature.created_at)).order_by(Temperature.created_at).limit(20)
    print str(temps) # print query for debugging
    return temps.all()

  def get_average_per_hour(self):
    temps = db.session.query(
        Temperature,
        db.func.round(db.func.avg(Temperature.value), 1).label('average'),
        db.func.group_concat(
          db.func.year(Temperature.created_at).distinct(),"-",
          db.func.lpad(db.func.month(Temperature.created_at),2,"0"),"-",
          db.func.lpad(db.func.day(Temperature.created_at), 2, "0")," ",
          db.func.lpad(db.func.hour(Temperature.created_at), 2, "0"), ":00").label('hour')
        ).group_by(db.func.hour(Temperature.created_at), db.func.day(Temperature.created_at)).order_by(Temperature.created_at).limit(20)
    print str(temps) # print query for debugging
    return temps.all()

  def add(self, temperature):
    temp = Temperature(temperature)
    db.session.add(temp)
    db.session.commit()

  def _measure(self, interval):
    while True:
      values = read()
      self.add(values['temperature'])

      print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(values['temperature'], values['humidity']))

      sleep(interval)

  # in seconds
  def start_measure_every(self, measure_interval):
    thread = Thread(target = self._measure, args = (measure_interval, ))
    thread.daemon = True
    thread.start()