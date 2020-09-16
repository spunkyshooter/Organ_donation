-- drop database if exists organDonation;
create database organDonation;
use organDonation;

-- Creating tables

-- hospital
create table Hospital(
-- didn't took hospital id something like that because we have an attribute phone number which is unique.
Hptl_phoneNumber varchar(10) primary key, -- assuming hospital has only one phone number
Name varchar(45),
Street varchar(20),
city varchar(10)
);

-- Receptionist
create table Receptionist(
Emp_id int primary key auto_increment,
Name varchar(20),
House_No int,
Street varchar(20),
city varchar(10),
Hptl_phoneNumber varchar(10) unique,
FOREIGN KEY (Hptl_phoneNumber) REFERENCES Hospital(Hptl_phoneNumber) on update cascade on delete set null
);

-- Receptionist phoneNumber(since , multivalued)
create table Receptionist_PhoneNo(
Emp_id int,
phoneNumber varchar(10),
foreign key (Emp_id) references Receptionist(Emp_id)
on update cascade
on delete cascade
);

-- Donor

create table Donor(
DID int primary key  auto_increment,
Emp_id int, -- the one who registers the donor
Name varchar(45),
sex varchar(8),
ABO varchar(3), -- max three characters ex: AB+, O+
HLA varchar(8), -- this is just a string of some antigens
House_No int,
Street varchar(20),
city varchar(10),
foreign key (Emp_id) references Receptionist(Emp_id) on update cascade on delete set null
);

-- Donor Phone Number
create table DonorPhoneNumbers(
DID int,
phoneNumber varchar(10),
foreign key (DID) references Donor(DID) on update cascade on delete cascade
);


-- organ. this is weak entity set
create table OrganBank(
code int not null, -- organ code ex: 1. kidney, 2. eye etc  -- code is the discriminator
DID int not null, -- DID with code is the primary key. not null since total participation.
Hptl_phoneNumber varchar(10),
primary key (code , DID), -- composite primary key
foreign key (DID) references Donor(DID) on update cascade on delete no action,
foreign key (Hptl_phoneNumber) references Hospital(Hptl_phoneNumber) on update cascade on delete set null
);


-- recipient
-- drop table recipient;
create table recipient(
RID int primary key auto_increment,
Hptl_phoneNumber varchar(10),
Name varchar(45),
sex varchar(8),
ABO varchar(3), -- max three characters ex: AB+, O+
HLA varchar(8), -- this is just a string of some antigens
House_No int,
Street varchar(20),
city varchar(10),
Organcode int, -- this can be null.
/*situation: suppose there are no donors and inturn there are no organs but we still need to register recipients*/
foreign key (Hptl_phoneNumber) references Hospital(Hptl_phoneNumber) on update cascade on delete set null
);


-- recipient phonenumber
-- drop table recipientPhoneNumbers;
create table recipientPhoneNumbers(
RID int not null,
phoneNumber varchar(10),
foreign key (RID) references recipient(RID) on update cascade on delete cascade
);


-- stored procedure

-- @DESC this gets hospital Name and gets Emp_Id and insert to donor table
-- @params Donor table's attributes along with HospitalName and code (Organ's code)
-- @params HName is  HospitalName. from this we get hptl_number
-- @params code is Organs Code. used to insert values in Organ Bank
DROP PROCEDURE IF EXISTS chamatkar;
delimiter $$
create procedure chamatkar(
IN HName varchar(45),IN Name varchar(45),IN sex varchar(8),
IN ABO varchar(3),IN HLA varchar(8),IN House_No int,IN Street varchar(20),
IN city varchar(10),IN code int)
begin
-- struggle is real to insert Donor aswell as OrganBank

	set @EID = 0;
    set @hptlNo = "";
   -- getting Emp_id
	select  Emp_id into @EID from Receptionist inner join Hospital on
	Hospital.Hptl_phoneNumber = Receptionist.Hptl_phoneNumber
	where Hospital.Name = HName;
    -- storing Hptl_phoneNumber
    select Hptl_phoneNumber into @hptlNo from Receptionist where Emp_id = @EID;
	-- select @EID,@hptlNo;
    -- inserting the values into Donor table
	insert into Donor (Emp_id,Name,sex,ABO,HLA,House_No,Street,city)
    values((select @EID),Name,sex,ABO,HLA,House_No,Street,city);
	-- getting DID from just inserted row
    set @DID = last_insert_id();
    -- inserting values to OrganBank
    insert into OrganBank (code,DID,Hptl_phoneNumber) values (code,@DID ,@hptlNo);

end $$
delimiter ;
/*
call chamatkar("Manu Hospital","Manu","Male","A+","abcdef",122,"haha street","jaipur",1);
select * from Donor;
select * from OrganBank;
delete from OrganBank where code = 1;
*/

DROP PROCEDURE IF EXISTS Insertrecipient;

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

-- call Insertrecipient("Manipal Hospital","manish","male","A+","abcdef",123,"asd","asd",333);
/*This procedure sends the Hospital name along with recipients details*/
-- drop procedure if exists getRecipients;
delimiter $$
create procedure getRecipients()
begin
	select R.RID,H.Name as Hospital,R.Name,R.sex,R.ABO,R.HLA,R.House_No,R.Street,R.city,R.OrganCode
    from recipient R inner join
    Hospital H on H.Hptl_phoneNumber = R.Hptl_phoneNumber;
end $$
delimiter ;

-- select * from recipient;
-- call getRecipients();

-- drop procedure Updaterecipient;
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

-- drop procedure if exists findMatch
delimiter $$
create procedure findMatch(IN ABO varchar(3),IN HLA varchar(8),IN organCode int)
begin
	-- select DID,ABO,code,HLA from
    /*
	select Donor.name from Donor
    inner join OrganBank on Donor.DID = OrganBank.DID
    where Donor.ABO = ABO and Donor.HLA = HLA and OrganBank.code = organCode;
    */
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

-- call findMatch("O+","abc",111);
