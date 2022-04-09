create table `mini_project_apidb`.merchant(
	id varchar(100) not null,
    password varchar(200),
    name varchar(40),
    address varchar(150),
    join_date timestamp,
    phone_number varchar(15),
    primary key (id)
);

create table `mini_project_apidb`.product(
	id varchar(100) not null,
    merchant_id varchar(100) not null,
    name varchar(40),
    quantity int,
    price int,
    primary key (id)
);
