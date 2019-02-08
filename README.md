# NSYSU CDPA dorm-net repair system


Using python3, flask, and sqlalchemy



## Requirement:



	mysql

	python3

	python3-pakages:

		1. flask

		2. flask-login
	
		3. flask-admin
	
		4. flask-wtf
		
		5. flask-sqlalchemy

		6. pymysql

		7. sqlalchemy

	



## Usage:


First, install mysql, python3 and the above python3 packages.





Second, run the install.sh script, it will need your mysql root privilege.


	$ cd CDPA_Repair_System
	$ ./install.sh




Third, system start. You can sepcify your desire port, otherwise, the program runs on port 80

	
	$ cd app/
	$ python3 .py --port=YOUR_PORT



