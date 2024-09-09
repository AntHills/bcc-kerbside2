import time
import sqlite3
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

def get_db_connection():
  conn = sqlite3.connect('database.db')
  conn.row_factory = sqlite3.Row
  return conn

@app.route('/time', methods=['GET'])
def get_current_time():
  return {'time': time.time()}

@app.route('/kerbside')
def get_kerbside_data():
  conn = get_db_connection()
  kerbside_dates = conn.execute('SELECT * FROM kerbside').fetchall()
  conn.close()
  