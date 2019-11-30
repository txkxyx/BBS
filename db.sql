create database bbs;
use bbs;
create table users(
    id int(11) primary key auto_increment,
    name varchar
(64) ,
    address varchar
(64),
    password varchar
(255)
    );
create table contents(
    id int(11) primary key auto_increment,
    name varchar
(64),
    text varchar
(300),
    insert_date datetime
    );
