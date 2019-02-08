from flask_wtf.csrf import CSRFProtect
import db_api as db


def csrf_protection(app):
    csrf = CSRFProtect()
    csrf.init_app(app)


def check_valid_registration(user, passwd, repasswd, email):
 
    # passwd == repasswd has already verify at frontend, pass


    # check if the username has alreay been registed or not
    if( db.check_is_already_have_same_username(user) ):
        return False
    

    return True
    




def check_valid_repairForm(repairForm):
    
    """ 
        check valid repair form
        the variable format check should be done at frontend
        
        In here, we are checking whether the user submited a same form or not
    """
    if( db.check_is_already_have_same_repairForm(repairForm) ):
        return False

    return True


def check_valid_revise_repairForm(repairForm):
    
    return True


def check_valid_adminUpdateForm(form):

    return True


