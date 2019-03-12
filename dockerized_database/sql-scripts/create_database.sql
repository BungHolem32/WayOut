
use wayout_networks;
CREATE TABLE networks (
id char(36) NULL,
name  varchar(255),
time_created bigint(15),
network_type ENUM('D-link','TP-link','Netgear'),
last_successful_connection bigint(15));