create table Hospital(
Hptl_phoneNumber varchar(10) primary key,
Name varchar(45),
Street varchar(20),
city varchar(10)
);
create table Receptionist(
Emp_id int primary key auto_increment,
Name varchar(20),
House_No int,
Street varchar(20),
city varchar(10),
Hptl_phoneNumber varchar(10) unique,
FOREIGN KEY (Hptl_phoneNumber) REFERENCES Hospital(Hptl_phoneNumber) on update cascade on delete set null
);
create table Receptionist_PhoneNo(
Emp_id int,
phoneNumber varchar(10),
foreign key (Emp_id) references Receptionist(Emp_id)
on update cascade
on delete cascade
);
create table Donor(
DID int primary key  auto_increment,
Emp_id int,
Name varchar(45),
sex varchar(8),
ABO varchar(3),
HLA varchar(8),
House_No int,
Street varchar(20),
city varchar(10),
foreign key (Emp_id) references Receptionist(Emp_id) on update cascade on delete set null
);

create table DonorPhoneNumbers(
DID int,
phoneNumber varchar(10),
foreign key (DID) references Donor(DID) on update cascade on delete cascade
);
create table OrganBank(
code int not null,
DID int not null,
Hptl_phoneNumber varchar(10),
primary key (code , DID),
foreign key (DID) references Donor(DID) on update cascade on delete no action,
foreign key (Hptl_phoneNumber) references Hospital(Hptl_phoneNumber) on update cascade on delete set null
);
create table recipient(
RID int primary key auto_increment,
Hptl_phoneNumber varchar(10),
Name varchar(45),
sex varchar(8),
ABO varchar(3),
HLA varchar(8),
House_No int,
Street varchar(20),
city varchar(10),
Organcode int,
foreign key (Hptl_phoneNumber) references Hospital(Hptl_phoneNumber) on update cascade on delete set null
);
create table recipientPhoneNumbers(
RID int not null,
phoneNumber varchar(10),
foreign key (RID) references recipient(RID) on update cascade on delete cascade
);
delimiter $$
create procedure chamatkar(
IN HName varchar(45),IN Name varchar(45),IN sex varchar(8),
IN ABO varchar(3),IN HLA varchar(8),IN House_No int,IN Street varchar(20),
IN city varchar(10),IN code int)
begin
	set @EID = 0;
    set @hptlNo = "";
	select  Emp_id into @EID from Receptionist inner join Hospital on
	Hospital.Hptl_phoneNumber = Receptionist.Hptl_phoneNumber
	where Hospital.Name = HName;
    select Hptl_phoneNumber into @hptlNo from Receptionist where Emp_id = @EID;
	insert into Donor (Emp_id,Name,sex,ABO,HLA,House_No,Street,city)
    values((select @EID),Name,sex,ABO,HLA,House_No,Street,city);
    set @DID = last_insert_id();
    insert into OrganBank (code,DID,Hptl_phoneNumber) values (code,@DID ,@hptlNo);

end $$
delimiter ;
delimiter $$
create procedure Insertrecipient(
IN HName varchar(45),IN Name varchar(45),IN sex varchar(8),
IN ABO varchar(3),IN HLA varchar(8),IN House_No int,IN Street varchar(20),IN city varchar(10),IN OrganCode int)
begin
	insert into recipient (Hptl_phoneNumber,Name,sex,ABO,HLA,House_No,Street,city,OrganCode)
	 select  H.Hptl_phoneNumber,Name,sex,ABO,HLA,House_No,Street,city,OrganCode
	 from Hospital as H
	where H.Name = HName;
end $$
delimiter ;
delimiter $$
create procedure getRecipients()
begin
	select R.RID,H.Name as Hospital,R.Name,R.sex,R.ABO,R.HLA,R.House_No,R.Street,R.city,R.OrganCode
    from recipient R inner join
    Hospital H on H.Hptl_phoneNumber = R.Hptl_phoneNumber;
end $$
delimiter ;
delimiter $$
create procedure Updaterecipient(
IN RRID int,IN RHName varchar(45),IN RName varchar(45),IN Rsex varchar(8),
IN RABO varchar(3),IN RHLA varchar(8),IN RHouse_No int,IN RStreet varchar(20),IN Rcity varchar(10),IN ROrganCode int
)
begin
set @hptlNo = ( select  H.Hptl_phoneNumber
	 from Hospital as H
	where H.Name = RHName);
	update recipient set Hptl_phoneNumber= @hptlNo ,Name = RName,sex = Rsex,ABO = RABO,HLA = RHLA,House_No = RHouse_No,Street = RStreet,city = Rcity,OrganCode = ROrganCode
	where RID = RRID;
end $$
delimiter ;

delimiter $$
create procedure findMatch(IN ABO varchar(3),IN HLA varchar(8),IN organCode int)
begin
		select Donor.name as DonorName, X.Name as HospitalName
    from Donor,
    (select OrganBank.DID , Hospital.Name
    from OrganBank inner join Hospital
    on OrganBank.Hptl_phoneNumber = Hospital.Hptl_phoneNumber
    where OrganBank.code = organCode
    ) as X
    where Donor.DID = X.DID and Donor.ABO = ABO and Donor.HLA = HLA;
end $$
delimiter ;
