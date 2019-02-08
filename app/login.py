from flask_login import UserMixin

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer




Base = declarative_base()


class User(UserMixin, Base):

    __tablename__ = "users"
    ID = Column(Integer, primary_key=True)
    username = Column(String(20))
    password = Column(String(300))


    def __init__(self, id, username, password, db, active=True):
        self.id = id
        self.username = username
        self.password = password
        self.db = db
        self.active = active


    def is_authenticated(self):
        return self.db.check_is_valid_user(self.username, self.password)

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def set_id_from_db(self, username):
        id = self.db.get_db_system_id(username)
        unicodeID = chr(id % 0x10FFFF)

        return unicodeID
    
    def get_email_from_db(self):
        return self.db.get_user_info_by_system_id(self.id)['email']
    
    # static method
    """
    def get(userID):

        if not userID:
            return None
       
        info = db.get_user_info_by_system_id(userID)
        return User(userID, info['username'], info['password'])
    """

