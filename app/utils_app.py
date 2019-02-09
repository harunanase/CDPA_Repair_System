from flask import request
from constants import ConstantsFront



def get_register_html_data():
    
    c = ConstantsFront()
    user = request.form[c.get_registHtml_text_form_name()['user']]
    passwd = request.form[c.get_registHtml_text_form_name()['passwd']]
    repasswd = request.form[c.get_registHtml_text_form_name()['repasswd']]
    email = request.form[c.get_registHtml_text_form_name()['email']]
    
    return user, passwd, repasswd, email


def get_login_html_data():
    
    c = ConstantsFront()
    username = request.form[c.get_loginHtml_text_form_name()['username']]
    password = request.form[c.get_loginHtml_text_form_name()['password']]

    return username, password


def get_form_html_data():
    
    c = ConstantsFront()
    dorm = request.form[c.get_formHtml_text_form_name()['dorm']]
    roomNum = request.form[c.get_formHtml_text_form_name()['roomNum']]
    bedNum = request.form[c.get_formHtml_text_form_name()['bedNum']]
    ip = request.form[c.get_formHtml_text_form_name()['ip']]
    mac = request.form[c.get_formHtml_text_form_name()['mac']]
    description = request.form[c.get_formHtml_text_form_name()['description']]


    if(mac != '' and mac != None):
        # the mac need special cast, from 00-00-00-11-22-33 to 000000112233
        mac = mac.replace('-', '')
    else:
        mac = '000000000000'

    # print(dorm, roomNum, bedNum, ip, mac, description)
    # print(type(dorm), type(roomNum), type(bedNum), type(ip), type(mac), type(description))
    repairForm = {
            'dorm' :        dorm,
            'roomNum' :     int(roomNum),
            'bedNum' :      int(bedNum), 
            'ip' :          ip,
            'mac' :         mac,
            'description' : description
        }
    # print(repairForm)
    return repairForm




def get_admin_update_form():
    
    c = ConstantsFront()
    formID = request.form[c.get_adminUpdateHtml_test_form_name()['formID']]
    repairTime = request.form[c.get_adminUpdateHtml_test_form_name()['repairTime']]
    description = request.form[c.get_adminUpdateHtml_test_form_name()['description']]
    status = request.form[c.get_adminUpdateHtml_test_form_name()['status']]
    
    # change data from 2019-12-29T10:07 to 2019-12-29 10:07:00
    repairDate = repairDate.replace("T", " ") + ":00"

    form = {
            'formID' :      formID,
            'repairTime' :  repairTime,
            'description':  description,
            'status':       status
        }
    

    return form



def get_request_repair_form_id():

    return request.args.get('id')


def get_modify_form_request_data():


    mac = request.args.get('mac')
    if(mac != '' and mac != None):
        # the mac need special cast, from 00-00-00-11-22-33 to 000000112233
        mac = mac.replace('-', '')
    else:
        mac = '000000000000'


    form =  {
                'id' :          request.args.get('id'),
                'dorm':         request.args.get('dorm'),
                'roomNum':      request.args.get('roomNum'),
                'bedNum':       request.args.get('bedNum'),
                'ip':           request.args.get('ip'),
                'mac':          mac,
                'description':  request.args.get('description')
            }

    return form



def get_admin_repair_data():

    reply = request.form['reply']
    if( reply == "other" ):
        description = request.form['description']
    else:
        description = reply

    form =  { 
                'formID' :          request.form['formID'],
                'repairTime':       request.form['repairTime'],
                'status':           request.form['status'],
                'description':      description
            }

    return form
