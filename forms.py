from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, SelectField, IntegerField
from wtforms.validators import DataRequired

class AddUserForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    prog_lang = SelectField('Programming Language', choices=[('cpp', 'C++'), ('py', 'Python'), ('js', 'JavaScript'), ('java', 'Java'), ('php', 'PHP'), ('other', 'Other')])
    experience_yr = FloatField('Years of Programming Experience', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired()])
    hw1_hrs = FloatField('Hours Spent on HW 1', validators=[DataRequired()])
    submit = SubmitField('Add')
