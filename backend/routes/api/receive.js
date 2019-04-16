const express = require('express');
const router = express.Router();
const {pool} = require("../../db");


handleReceiveRequest = (req,res) =>{
    pool.query("select * from recipient",(err,rows) => {
        if(err)
        { return res.json({'error':true, 'message':'Error occurred'+err})}
        //connection will be released as well.
        res.json(rows);
    });
}

//@route /api/receive/recipients
//@desc get all recipients
router.get('/recipients', (req,res)=>{
    handleReceiveRequest(req,res);
})

//@route /api/receive
router.post('/',(req,res) => {
    // console.log("posting...")
    // console.log(req.body)
    let data = req.body
    

    let query = "call Insertrecipient(?,?,?,?,?,?,?,?)"
    let insert = [data.Hospital,data.fName,data.gender,data.ABO,data.HLA,data.HouseNo,data.Street,data.City];
    
    pool.query(query,insert,(err,rows)=>{
        if(err){
            console.log({message: err})
        }else{
            res.send(rows)  
        }
    })
    
})

//@route /api/receive/delete/:id
router.delete('/delete/:id',(req,res)=>{
    let query = `delete from recipient where RID = ${req.params.id}`
    pool.query(query,(err,rows)=>{
        if(err){
            console.log({message:err})
        }else{
            console.log(rows);
        }
    })
})



module.exports = router
