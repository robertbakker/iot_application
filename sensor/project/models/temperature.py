from project import db
import datetime
from collections import OrderedDict

def dump_datetime(value):
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]

class Temperature(db.Model):
    __tablename__ = 'temperatures'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Float, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return '<Temperature %r>' % self.value

    @property
    def serialize(self):
        result = OrderedDict()
        result['id'] = self.id
        result['value'] = self.value
        result['created_at'] =  ' '.join(dump_datetime(self.created_at))
        return result