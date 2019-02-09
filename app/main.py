from argparse import ArgumentParser
from flask import request, render_template, redirect, url_for, flash, jsonify
from flask_login import login_required, login_user, logout_user, current_user


import utils_app
import application
import admin
import security
import db_api as dbapi
import os
import json

""" Argument parsing """
parser = ArgumentParser()
parser.add_argument("--port", type=int, default=80, help='port to run')
opt = parser.parse_args()
"""------------------"""

# initialize login stuff and create admin page
app, db, login_manager = application.app_db_login_initialized()
myadmin = admin.create_admin(app)


# flask-login callback 
@login_manager.user_loader
def load_user(user_id):
    return application.User.query.get(user_id)





# json parsing
def json2dict():
    filename = os.path.join(app.static_folder, 'json/trans.json')
    with open(filename) as blog_file:
        data = json.load(blog_file)
        return data



"""----------"""
""" Routings """
"""----------"""
@app.route('/')
def index():
    return render_template('./index.html', jsonDict = json2dict())

@app.route('/trouble_shooting.html')
def trouble_shooting():
    return render_template('./trouble_shooting.html')


@app.route('/en_trouble_shooting.html')
def en_trouble_shooting():
    return render_template('./en_trouble_shooting.html')


@app.route('/queryMAC.html')
def query_mac():
    return render_template('./queryMAC.html')

@app.route('/queryIPConflict.html')
def query_ip_Conflict():
    return render_template('./queryIPConflict.html')

@app.route('/under_construction.html')
def under_construction():
    return render_template('./under_construction.html')

@app.route('/banned.html')
def banned():
    return redirect(url_for('under_construction'))

@app.route('/register.html', methods = ['GET', 'POST'])
def regist_request():
    if request.method == 'POST':
        user, passwd, repasswd, email = utils_app.get_register_html_data()
        if( security.check_valid_registration(user, passwd, repasswd, email) ):
            dbapi.regist_account(user, passwd, email)
            flash('regist success!')
            return redirect(url_for('index'))

        else: 
            # registration failed, return to regist.html
            flash('regist failed, the username has been used')
            return redirect(url_for('regist_request'))
    else:
        return render_template('./register.html')




@app.route('/login.html', methods = ['GET', 'POST'])
def login():
 
    if request.method == 'POST':
        
        username, password = utils_app.get_login_html_data()
        if( dbapi.check_is_valid_user(username, password) ):
            user = application.User.query.filter_by(username=username).first()
            login_user(user)
            flash('Login success!')
            return redirect(url_for('index'))
        else:
            flash('Wrong username or password!')

    return render_template('./login.html')




@app.route('/form.html', methods = ['GET', 'POST'])
@login_required
def form():
    
    if request.method == 'POST':
        repairForm = utils_app.get_form_html_data()
        if( security.check_valid_repairForm(repairForm) ):
            dbapi.submit_repairForm(current_user.username, repairForm)
            flash('Submit Success')
            return redirect(url_for('index'))
        else:
            flash('Invalid repair form, repair form duplication')
            return redirect(url_for('form'))
    else:
        return render_template('./form.html')



@app.route('/form_status.html', methods = ['GET'])
@login_required
def get_form():
    formList = dbapi.get_repairForm_by_username(current_user.username)
    logList = [ dbapi.get_form_admin_log_by_formID(i['ID']) for i in formList ]

    totalForm = len(formList)
    totalLogsInEachForm = [ len(i) for i in logList ]
    if( totalForm == 0 ):
        flash("No exisit form!")
    return render_template('./form_status.html', totalForm = totalForm, formList = formList,
                                totalLogsInEachForm = totalLogsInEachForm, logList = logList)


@app.route('/modify_form.html', methods = ['POST', 'GET'])
@login_required
def modify_form():

    if request.method == 'POST':
        reviseForm = utils_app.get_form_html_data()
        formID = utils_app.get_request_repair_form_id()
        if( security.check_valid_revise_repairForm(reviseForm) ):
            dbapi.update_repairForm(formID, reviseForm)
            flash("Modify Success")
            return redirect(url_for('index'))
        else:
            flash('Invalid repair form')
            return redirect(url_for('modify_form'))
    else:
        oldFormData = utils_app.get_modify_form_request_data()
        return render_template("./modify_form.html", form=oldFormData)
    





@app.route('/logout.html')
@login_required
def logout():
    logout_user()
    flash("Logout Success!")
    return render_template('index.html', action='Login', jsonDict=json2dict())



@app.route('/protected')
@login_required
def protected():
    return "Logged in as " + current_user.username



if __name__ == "__main__":

    security.csrf_protection(app)
    # run 
    app.run(host='0.0.0.0', port=opt.port, debug=True)


