import time
import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
from datetime import datetime, timedelta, timezone
import os.path

app = Flask(__name__)
cors = CORS(app, origins='*')

def get_db_connection():
  conn = sqlite3.connect('database.db')
  conn.row_factory = sqlite3.Row
  return conn

@app.route('/time', methods=['GET'])
def get_current_time():
  return {'time': time.time()}

@app.route('/api/kerbside', methods=['GET'])
def get_kerbside_data():
  conn = get_db_connection()
  cur = conn.cursor()

  cur.execute('SELECT * FROM kerbside ORDER BY kerbside_week')
  rows = cur.fetchall()

  data = [
        {
            'id': row[0],
            'updated': row[1],
            'suburb': row[2],
            'kerbsideWeek': row[3]
        } for row in rows
    ]
  
  return jsonify(data)

@app.route('/api/pull-data', methods=['GET'])
def pull_dates():
  current_time = datetime.utcnow()
  print(current_time)

  conn = get_db_connection()
  cur = conn.cursor()
  cur.execute('SELECT updated FROM datefetches')
  row = cur.fetchall()
  response_date = row[0][0]

  run_time = datetime.strptime(response_date, "%Y-%m-%d %H:%M:%S")

  difference = current_time - run_time
  print(difference)
  if difference >= timedelta(minutes=5):
    if os.path.isfile("venv/Scripts/python.exe"):
      subprocess.Popen(['venv/Scripts/python', 'pull_dates.py'])
    elif os.path.isfile("venv/bin/python3"):
      subprocess.Popen(['venv/bin/python3', 'pull_dates.py'])
    conn.close()
    return jsonify({"message": "Data pull started"}) 
  else: 
    conn.close()
    return jsonify({"message": "Data fetched recently"}) 


  