
#Import csv to postgresql db

import psycopg2
import pandas as pd

conn = psycopg2.connect("host=localhost dbname=homework_users user=postgres")
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users;")

cur.execute('''CREATE TABLE users (
    uid SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    prog_lang TEXT NOT NULL,
    experience_yr FLOAT NOT NULL,
    age INTEGER NOT NULL,
    hw1_hrs FLOAT NOT NULL);''')

conn.commit()

df_users = pd.read_csv('static/data/predefined_users.csv', index_col=0)
for idx, u in df_users.iterrows():
    cur.execute('''INSERT INTO users (username, first_name, last_name, prog_lang, experience_yr, age, hw1_hrs) VALUES (%s,%s,%s,%s,%s,%s,%s)''', (u.username, u.first_name, u.last_name, u.prog_lang, u.experience_yr, u.age, u.hw1_hrs))
    conn.commit()

cur.close()
conn.close()
