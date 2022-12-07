use exp_sys_hi;

drop table if  exists user_hi;
drop table if  exists hi;
drop table if  exists user;
create table hi (
	id int primary key auto_increment,
    gi float,
    height float,
    weight float,
    ldl float,
    hdl float,
    trigl float,
    hi float default 0,
    date_created datetime default current_timestamp()
);

create table user (
	id int,
    name varchar(255),
    username varchar(255) not null primary key,
    password varchar(255)
);

create table user_hi(
	username varchar(255),
	hi_id int,
	foreign key (username) references user(username) ON DELETE CASCADE,
	foreign key (hi_id) references hi(id) ON DELETE CASCADE
);

insert into user_hi value('thanh',1);
delete from hi where id=1;