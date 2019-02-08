from flask_admin.contrib.sqla import ModelView
from flask_admin import BaseView, AdminIndexView, Admin
from flask_login import current_user
from flask import redirect, url_for, flash, render_template, request
import ipaddress
import flask_admin


from application import db, User, RepairForm, AdminLog
import security
import db_api as dbapi
import utils_app


class MyAdminIndexView(AdminIndexView):
    
    @flask_admin.expose('/')
    def index(self):
        if( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) ):
            # check is logined && is admin
            return super(MyAdminIndexView, self).index()
        else:
            return redirect(url_for('index'))



class AdminLogModelView(ModelView):
      
    can_delete = False  # disable model deletion, admin log can not be remove or edit
    can_edit = False    # disable model edit
    column_searchable_list = ['formID', 'repairManName']

    def is_accessible(self):
        return ( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) )
   
    


class RepairFormModelView(ModelView):
    
    column_list = ['ID', 'createUser', 'createTime', 'updateTime', 'dorm', 'roomNum', 'bedNum',
                                    'ip', 'mac', 'description', 'status']

    can_delete = False
    can_edit = False
    column_searchable_list = ['dorm', 'roomNum', 'ip', 'mac', 'createUser']
    
    def is_accessible(self):
        return ( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) )
 


    
class UserModelView(ModelView):
    
    create_modal = True
    edit_modal = True
    column_searchable_list = ['username', 'email']    
    
    def is_accessible(self):
        return ( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) )
 



class UpdateFormModelView(BaseView):
    
    def is_accessible(self):
        return ( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) )
   

    @flask_admin.expose('/')
    def index(self):
        return redirect(url_for('.update'))

    @flask_admin.expose('/updateForm', methods=['GET', 'POST'])
    def update(self):
        if request.method == 'POST':
            form = utils_app.get_admin_update_form()
            if( security.check_valid_adminUpdateForm(form) ):
                self.db.submit_admin_update_form(current_user.username, form)
                flash('Submit Success!')
            else:
                flash('Invalid form!')
            return self.render('admin/update_form.html')
        else:
            id = utils_app.get_request_repair_form_id()
            return self.render('admin/update_form.html', id=id)


class AllFormsModelView(BaseView):


    def is_accessible(self):
        return ( current_user.is_authenticated and dbapi.check_is_admin_by_username(current_user.username) )
   

    @flask_admin.expose('/')
    def index(self):
        return redirect(url_for('.allForms'))

    @flask_admin.expose('/allForms', methods=['GET', 'POST'])
    def allForms(self):
        formList = dbapi.get_all_repairForm()
        logList = [ dbapi.get_form_admin_log_by_formID(i['ID']) for i in formList ]
        totalForm = len(formList)
        totalLogsInEachForm = [ len(i) for i in logList ]
        if( totalForm == 0 ):
            flash("No exisit form!")

        return self.render('admin/fixRequestList.html', totalForm=totalForm, list=formList,
                                        totalLogsInEachForm = totalLogsInEachForm, logList = logList)

    
    @flask_admin.expose('/repair', methods=['GET', 'POST'])
    def repair(self):
        if request.method == "POST":
            repair = utils_app.get_admin_repair_data()
            if( security.check_valid_adminUpdateForm(repair)):
                dbapi.submit_admin_update_form(current_user.username, repair)
                flash('Submit Success!')
                return redirect(url_for('.allForms'))
            else:
                flash('Submit Failed')
    
        id = utils_app.get_request_repair_form_id()
        form = dbapi.get_repairForm_by_id(id)
        logList = dbapi.get_form_admin_log_by_formID(id)
        return self.render('admin/repair.html', form=form, log=logList, logNum=len(logList))
    


    
def create_admin(app):
    # set optional bootswatch theme
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    admin = Admin(app, name='Admin Page', template_mode='bootstrap3', index_view=MyAdminIndexView())
    admin.add_view(UserModelView(User, db.session, category="database"))
    admin.add_view(RepairFormModelView(RepairForm, db.session, category="database"))
    admin.add_view(AdminLogModelView(AdminLog, db.session, category="database"))
    admin.add_view(AllFormsModelView(name="all forms"))
    admin.add_view(UpdateFormModelView(name="update form"))

    


    return admin
