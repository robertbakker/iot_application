# Requirements

* Node.JS 0.10+ with NPM
* Python 2.7
* Raspberry Pi 3
* Adafruit AM2303 sensor connected to pin number 4

# Installation

Can run it in only 6 steps!


Install python dependencies:

`pip install -r requirements.txt`

Install node dependencies:

`npm install`

Compile the LESS and JS files to the public folder:

`npm run build`

To set up the database run `python` and then run

`> from project import app, db`

`> db.create_all()`


To run the server:

`sudo python app.py`