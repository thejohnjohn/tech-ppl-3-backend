create database tech_ppl_3_db;

use tech_ppl_3_db;

create table employee(
  id int not null PRIMARY KEY auto_increment,
  name varchar(40) not null,
  email varchar(40) not null,
  phone varchar(40) not null,
  position varchar(40) not null, 
  photo varchar(40) not null,
  payment varchar(40) not null
);

create table client(
  id int unsigned not null PRIMARY KEY auto_increment,
  clientName varchar(40) not null,
  phone varchar(40) not null,
  email varchar(40) not null,
  site varchar(40) not null,
  CNPJ varchar(40) not null,
  logo varchar(40) not null
);

create table project(
    id int unsigned not null PRIMARY KEY auto_increment,
    projectName varchar(40) not null,
    projectOwner int unsigned not null,
    techHoursQuantity varchar(40) not null,
    deadline varchar(40),
    projectPriority int unsigned,
    projectBriefing varchar(40),
    projectLeader int unsigned not null,
    techHoursQuantity int unsigned,
    projectTeam varchar(30) not null,

    FOREIGN KEY (projectOwner) REFERENCES client(id),
    FOREIGN KEY (projectLeader) REFERENCES employee(id)
);
