const express = require('express');
const router = express.Router();
const {pool} = require("../../db");

let codes = { "Eyes":111,"Lungs":222,"Kidney":333,"Liver":444,"Bone Marrow":555,"Heart":666}
handleReceiveRequest = (req,res) =>{
    pool.query("call getRecipients()",(err,rows) => {
        if(err)
        { return res.json({'error':true, 'message':'Error occurred'+err})}
        //connection will be released as well.
        // console.log( JSON.stringify(rows[0]));
        res.json(rows[0]);
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
    

    let query = "call Insertrecipient(?,?,?,?,?,?,?,?,?)"
    let insert = [data.Hospital,data.fName,data.gender,data.ABO,data.HLA,data.HouseNo,data.Street,data.City,codes[data.organ]];
    
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

//@route /api/receive/edit/:RID
router.put("/edit/:RID",(req,res)=>{
    let data = req.body
    console.log(data);
    let query = "call Updaterecipient(?,?,?,?,?,?,?,?,?,?)"
    let insert = [req.params.RID,data.Hospital,data.fName,data.gender,data.ABO,data.HLA,data.House_No,data.Street,data.City,codes[data.organ]];
    
    pool.query(query,insert,(err,rows)=>{
        if(err){
            console.log({message: err})
        }else{
            res.send(rows)  
        }
    })
})
module.exports = router
