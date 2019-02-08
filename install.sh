#!/bin/bash

pip3 install pymysql flask flask-admin flask-login sqlalchemy flask-wtf flask-sqlalchemy

mysql -u root -p < sqls/initialize.sql


