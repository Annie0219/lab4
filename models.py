from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    prog_lang = db.Column(db.String(64), nullable=False)
    experience_yr = db.Column(db.Float, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    hw1_hrs = db.Column(db.Float, nullable=False)
