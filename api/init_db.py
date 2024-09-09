import sqlite3

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
  connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO kerbside (suburb, kerbside_week) VALUES (?, ?)",
            ('Acacia Ridge', '2024/08/26'))

cur.execute("INSERT INTO kerbside (suburb, kerbside_week) VALUES (?, ?)",
            ('Albion', '2024/10/21'))

connection.commit()
connection.close()