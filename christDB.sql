create schema christ;
use christ;

create table stuinfo(
	stu_id varchar(5) primary key,
    stu_name varchar(50) not null,
    age varchar(3) not null,
    gender varchar(10) not null,
    course varchar(50) not null,
    address varchar(150) not null,
    grade varchar(3) not null); 
    
insert into stuinfo values
	('S01', 'Ashwin', '21', 'male', 'MCA', 'Bangalore, Karnataka, India', 'A');
    
select * from stuinfo;