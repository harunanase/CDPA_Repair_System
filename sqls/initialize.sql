/* this file is for initialize CDPA repair system database
 * Author: haruna
 * Date: Jan. 21st, 2019
 * Contact: abc87987@gmail.com
 */


/* set time zone, Taiwan +8 */
SET time_zone='+08:00';

/* drop table if it is already exist */
DROP DATABASE IF EXISTS CDPA_repairSYS; 



/* create database */
CREATE DATABASE CDPA_repairSYS;

/* create user */
/*SET GLOBAL validate_password.policy=LOW;*/
CREATE USER IF NOT EXISTS 'haruna'@'localhost' IDENTIFIED BY 'harunamywife';
GRANT ALL PRIVILEGES ON CDPA_repairSYS.* TO 'haruna'@'localhost';



ALTER DATABASE CDPA_repairSYS CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;




use CDPA_repairSYS;


