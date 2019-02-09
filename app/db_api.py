from sqlalchemy.orm import joinedload
import datetime as dt



from application import db, User, RepairForm, AdminLog


def db_commit():
    db.session.commit()



def add_data2DB(data):

    db.session.add(data)
    db_commit()


def convert_form2human_readable(form):
    formDict = {}

    formDict['ID'] = form.ID
    formDict['createTime'] = form.createTime
    formDict['updateTime'] = form.updateTime
    formDict['createUser'] = form.createUser
    formDict['dorm'] = form.dorm
    formDict['roomNum'] = "{:03d}".format(form.roomNum)
    formDict['bedNum'] = form.bedNum
    formDict['ip'] = form.ip
    
    # 112233445566 to 11-22-33-44-55-66
    formDict['mac'] = '0' if(form.mac == '') else '-'.join(format(s, '02x') for s in bytes.fromhex(form.mac))
    
    formDict['description'] = form.description


    formDict['status'] = status2str(form.status)
   
    return formDict


def regist_account(username, password, email):
    
    newUser = User(username=username, password=password, email=email)
    add_data2DB(newUser)



def submit_repairForm(createUser, repairForm):

    newForm = RepairForm( createUser=createUser, dorm=repairForm['dorm'], roomNum=repairForm['roomNum'],
                                bedNum=repairForm['bedNum'], ip=repairForm['ip'], mac=repairForm['mac'], 
                                            description=repairForm['description'] )
    add_data2DB(newForm)
   


def submit_admin_update_form(adminName, form):
    
    # insert an admin log and update the status of repair form
    newLog = AdminLog(formID=form['formID'], repairTime=form['repairTime'], repairManName=adminName,
                                description=form['description'])
    add_data2DB(newLog)
    
    update_repairForm_status_by_id(form['formID'], form['status'])
    



def get_repairForm_by_username(username):
    
    formList = RepairForm.query.filter_by(createUser=username).all()
    
    # convert status to human readable
    formList =  [ convert_form2human_readable(i) for i in formList ]

    return formList



def get_form_admin_log_by_formID(id):

    list = AdminLog.query.filter_by(formID=id).all()
    return list



def get_db_system_id(username):
    return User.query.filter_by(username=username).first().ID



def get_user_info_by_system_id(systemID):

    info = User.query.filter_by(ID=systemID).first()
    return { 'username': info.username, 'password': info.password, 'email': info.email }



def get_all_username():
    return [ i.username for i in User.query.all() ]
    


def get_all_repairForm():
    formList = RepairForm.query.all()
    formList = [ convert_form2human_readable(i) for i in formList ]
    
    return formList


def get_repairForm_by_id(id):
    
    form = RepairForm.query.filter_by(ID=id).first()
    return convert_form2human_readable(form)



def check_is_valid_user(username, password):

    q = User.query.filter_by(username=username, password=password)
    return db.session.query(q.exists()).scalar()



def check_is_admin_by_username(username):

    q = User.query.filter_by(username=username, isAdmin=1)
    return db.session.query(q.exists()).scalar()



def check_is_already_have_same_username(username):
    q = User.query.filter_by(username=username)
    return db.session.query(q.exists()).scalar()



def check_is_already_have_same_repairForm(form):

    q = RepairForm.query.filter_by( dorm=form['dorm'], roomNum=form['roomNum'], bedNum=form['bedNum'] )
    return db.session.query(q.exists()).scalar()
                                    


def update_user_email_auth(username, newAuth):

    info = User.query.filter_by(username=username).first()
    info.isEmailAuth = newAuth
    db_commit()



def update_repairForm_status_by_id(id, newStatus):

    info = RepairForm.query.filter_by(ID=id).first()
    info.status = newStatus
    db_commit()



def update_repairForm(formID, newForm):

    info = RepairForm.query.filter_by(ID=formID).first()
    
    info.dorm = newForm['dorm']
    info.roomNum = newForm['roomNum']
    info.bedNum = newForm['bedNum']
    info.ip = newForm['ip']
    info.mac= newForm['mac']
    info.description = newForm['description']
    db_commit()
    


def status2str(status):
    if(status == 0):
        string = "尚未處理/Not process yet"
    elif(status == 1):
        string = "處理中/In process"
    elif(status == 2):
        string = "處理完畢/Finished"
    else:
        string = "Code error!"

    return string




""" API test """
if __name__ == "__main__":
    #regist_account('hi', 'pwd', 'i@re')
    #submit_repairForm('hi', {'dorm':'C', 'roomNum':122, 'bedNum':3, 'ip': None, 'mac': None, 'description': None})
    print(get_repairForm_by_username('hi'))
    print(get_form_admin_log_by_formID(1))
    print(check_is_valid_user('hi', 'pwda'))
    print(get_db_system_id('hi'))
    print(get_user_info_by_system_id(1))
    print(check_is_admin_by_username('hi'))
    #update_user_email_auth('hi', 1)
    #update_repairForm_status_by_id(2, 1)
    #update_repairForm_status_by_id(2, 2)
    #update_repairForm(1, newForm={'dorm':'C', 'roomNum':122, 'bedNum':3, 'ip': '140.117.66.55', 'mac': None, 'description': None})

    #submit_admin_update_form('haruna', {'formID':1, 'repairTime': dt.datetime.now(), 'description':'testlog', 'status':2})
    print(get_all_username())
    print(get_all_repairForm())
    #print(get_repairForm_by_id(1))
    #print(check_is_already_have_same_username('hi'))
    #print(check_is_already_have_same_repairForm(get_repairForm_by_id(1)))

