use organdonation;

-- hospital data
insert into Hospital (Hptl_phoneNumber,Name,Street,city) values(987654321,"Manu Hospital","Majestic","Bengaluru");
insert into Hospital (Hptl_phoneNumber,Name,Street,city) values(987654322,"Manipal Hospital","Chandpole","Jaipur");
insert into Hospital (Hptl_phoneNumber,Name,Street,city) values(987654323,"Appolo Hospital","Tardeo Rd","Mumbai");
insert into Hospital (Hptl_phoneNumber,Name,Street,city) values(987654324,"BLK Hospital","Rj place","Delhi");

-- receptionist data
insert into Receptionist (Emp_id,Name,House_No,Street,city,Hptl_phoneNumber) values (65,"Chandler",12,"abc","Bengaluru",987654321);
insert into Receptionist (Emp_id,Name,House_No,Street,city,Hptl_phoneNumber) values (66,"Ross",13,"def","Jaipur",987654322);
insert into Receptionist (Emp_id,Name,House_No,Street,city,Hptl_phoneNumber) values (67,"Monika",14,"ghi","Mumbai",987654323);
insert into Receptionist (Emp_id,Name,House_No,Street,city,Hptl_phoneNumber) values (68,"Rachel",14,"jkl","Delhi",987654324);

--  Receptionist_PhoneNo
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (65,9123123122);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (65,9459234623);
insert into Receptionist_PhoneNo(Edonormp_id,phoneNumber) values (66,9788528456);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (66,9469234623);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (67,9874653476);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (67,9353453445);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (68,9876542345);
insert into Receptionist_PhoneNo(Emp_id,phoneNumber) values (68,9095677645);


-- donor
insert into Donor (Emp_id,Name,sex,ABO,HLA,House_No,Street,city) values(65,"Manu","Male","A+","abcdef",122,"haha street","jaipur");