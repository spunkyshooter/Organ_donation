const express = require('express');
const router = express.Router();
const {pool} = require("../../db");
const {getHptlNumber} = require("./hospital");

//@route /api/receptionist
router.get('/:hptlName',(req,res)=>{
    req.name = req.params.hptlName;
    let hptlNumber =  getHptlNumber(req);
    console.log("hptlnumber"+ hptlNumber);
    let query = `select Emp_id from Receptionist where Hptl_phoneNumber = ${hptlNumber}`
    pool.query(query,(err,rows) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log("printing.....")
            console.log(rows);
            res.send(rows);
        }
    })
})
module.exports = router