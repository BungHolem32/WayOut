
-- CREATE LOCALHOST USER
CREATE user test@localhost identified by 'test';
GRANT ALL PRIVILEGES ON *.* TO 'test'@'localhost' WITH GRANT OPTION;
ALTER USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test';

-- CREATE USER FOR ALL IPS
CREATE user test@'%' identified by 'test';
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' WITH GRANT OPTION;
ALTER USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY 'test';

-- REFRESH ALL PRIVILEGES
FLUSH PRIVILEGES;


