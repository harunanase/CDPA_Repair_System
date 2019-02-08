from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin


import os
from sqlalchemy.sql import func
from sqlalchemy.orm import joinedload



""" Flask application and database config """
app = Flask(__name__, static_folder='static', template_folder='template')
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://haruna:harunamywife@localhost/CDPA_repairSYS"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.urandom(24) 
db = SQLAlchemy(app)
"""---------------------------------------"""  


def app_db_login_initialized():
    
    db.create_all()
    login_manager = LoginManager()
    login_manager.login_view = "login"
    login_manager.init_app(app)

    return app, db, login_manager



class User(db.Model, UserMixin):
 
    __tablename__ = 'users'
    ID = db.Column(db.Integer, primary_key=True, nullable=False)
    createTime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updateTime = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    isAdmin = db.Column(db.Boolean(), default=0)
    isEmailAuth = db.Column(db.Boolean(), default=0)
 
    
    def __repr__(self):
        return '<User %r>' % self.username

    def is_authenticated(self):
        return db.check_is_valid_user(self.username, self.password)

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.ID




class RepairForm(db.Model):

    __tablename__ = 'repairForm'
    ID = db.Column(db.Integer, primary_key=True, nullable=False)
    createTime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updateTime = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    createUser = db.Column(db.String(20), nullable=False)
    dorm = db.Column(db.String(20), nullable=False)
    roomNum = db.Column(db.Integer, nullable=False)
    bedNum = db.Column(db.Integer, nullable=False)
    ip = db.Column(db.String(20))
    mac = db.Column(db.String(20))
    description = db.Column(db.Text)
    status = db.Column(db.Integer, nullable=False, default=0)
    
    def __repr__(self):
        return '<FormID %r>' % self.ID


class AdminLog(db.Model):

    __tablename__ = 'adminLog'
    ID = db.Column(db.Integer, primary_key=True, nullable=False)
    createTime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    repairTime = db.Column(db.DateTime(timezone=True), nullable=False)
    repairManName = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)

    # table relationship
    formID = db.Column(db.Integer, db.ForeignKey('repairForm.ID'))
    repairForm = db.relationship('RepairForm', backref=db.backref('adminLogs', lazy=True))
    
    def __repr__(self):
        return '<logID %r>' % self.ID

   




def main():
    """
    db.create_all()
    r = RepairForm(createUser='jeff', dorm='B', roomNum=103, bedNum=4)
    db.session.add(r)
    
    AdminLog(repairTime = datetime.datetime.now(), repairManName='a1', description='t111', repairForm=r)
    AdminLog(repairTime = datetime.datetime.now(), repairManName='a2', description='t222', repairForm=r)

    db.session.commit()
    q = RepairForm.query.options(joinedload('adminLogs'))
    for i in q:
        print(i, i.adminLogs)
    """
    pass
    

if __name__ == "__main__":
    main()

