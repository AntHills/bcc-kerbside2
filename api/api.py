import time
import sqlite3
from flask import Flask, jsonify
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
  conn.close()
  return jsonify(data)
  