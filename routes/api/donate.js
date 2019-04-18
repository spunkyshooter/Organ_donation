const express = require('express');
const router = express.Router();
const {pool} = require("../../db");

let codes = { "Eyes":111,"Lungs":222,"Kidney":333,"Liver":444,"Bone Marrow":555,"Heart":666}
handleDonateRequest = (req,res) =>{
    pool.query("select * from donor",(err,rows) => {
        if(err)
        { res.send({'error':true, 'message':'Error occurred'+err})}
        //connection will be released as well.
        // console.log(rows)
        res.json(rows);
    });
}

//@route /api/donate/donors
//@desc get all donors
router.get('/donors', (req,res)=>{
   handleDonateRequest(req,res);
})

//@route /api/donate
router.post('/',(req,res) => {
    // console.log("posting...")
    // console.log(req.body)
    let data = req.body
    

    let query = "call chamatkar(?,?,?,?,?,?,?,?,?)"
    let insert = [data.Hospital,data.fName,data.gender,data.ABO,data.HLA,data.House_No,data.Street,data.City,codes[data.organ]];
    
    pool.query(query,insert,(err,rows)=>{
        if(err){
            console.log({message: err})
        }else{
            res.send(rows)  
        }
    })
    
})

//@route /api/donor/delete/:id
router.delete('/delete/:id',(req,res)=>{
    let query = `delete from Donor where DID = ${req.params.id}`
    pool.query(query,(err,rows)=>{
        if(err){
            console.log({message:err})
        }else{
            console.log(rows);
        }
    })
})



module.exports = router
