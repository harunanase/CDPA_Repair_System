# define frontend constants
class ConstantsFront():
    def __init__(self):
        """
            edit here, the frontend constants 
        """
        self.__registHtmlTextFormName = {   'user':     'account', 
                                            'passwd':   'password', 
                                            'repasswd': 'verify',
                                            'email':    'mailbox' }

        self.__loginHtmlTextFormName = {    'username': 'account',
                                            'password': 'password' }

        self.__formHtmlTextFormName = {     'dorm':     'dorm',
                                            'roomNum':  'roomNo',
                                            'bedNum':   'bedNo',
                                            'ip':       'IP',
                                            'mac':      'MAC',
                                            'description':  'problem' }


        self.__adminUpdateHtmlTextFormName = {  'formID': 'formID',
                                                'repairTime': 'repairTime',
                                                'description': 'description',
                                                'status': 'status' }
        """ end of edit """


    def get_registHtml_text_form_name(self):
        return self.__registHtmlTextFormName
    def get_loginHtml_text_form_name(self):
        return self.__loginHtmlTextFormName
    def get_formHtml_text_form_name(self):
        return self.__formHtmlTextFormName
    def get_adminUpdateHtml_test_form_name(self):
        return self.__adminUpdateHtmlTextFormName

