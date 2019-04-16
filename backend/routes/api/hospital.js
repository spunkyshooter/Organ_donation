const express = require('express');
const router = express.Router();
const {pool} = require("../../db");

getHptlNumber = (req)=> {
    let query = "select Hptl_phoneNumber from Hospital where Name = ?"
    // console.log(req.name)
    pool.query(query,[req.name],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
           HptlNumber = JSON.parse(JSON.stringify(rows))[0].Hptl_phoneNumber;
        //    req.HptlNumber = HptlNumber;
        // // res.send(HptlNumber);
        console.log("printing..."+ HptlNumber)
        return HptlNumber
        }
    })
}
//@route /api/hosiptal
router.get('/:name',(req,res)=>{
    req.name= req.params.name;
    res.send(getHptlNumber(req));
})
module.exports = {router,getHptlNumber}