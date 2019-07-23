# DB to D3 Lab

1. Setup DB
    + psql: `CREATE DATABASE homework_users;`
    + psql: `\c homework_users`
    + psql: `CREATE TABLE users(uid SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, prog_lang VARCHAR(100) NOT NULL, experience_yr FLOAT NOT NULL, age INT NOT NULL, hw1_hrs FLOAT NOT NULL);`
    
2. Setup project
    + For psycopg2 on Mac, set `PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"`
    + `pip install psycopg2`
    + `pip install pandas`
    + `pip install flask`
    + `pip install SQLAlchemy`
    + `pip install flask_sqlalchemy`
    + `pip install flask_wtf`
    + For .env setup, `pip install python-dotenv`
        - Create '.env' fill in root directory
        - Add directives:<br>
            `FLASK_ENV=DEVELOPMENT`
            `FLASK_DEBUG=TRUE`
    
3. Seed DB
    + `python static/data/db.py`
    + psql: `SELECT * FROM users`

