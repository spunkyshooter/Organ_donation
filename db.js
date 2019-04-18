const mysql      = require('mysql');
const config = require("./config");
const pool = mysql.createPool({connectionLimit:10, ...config});
// doubt? how do we know is database connected or not
module.exports = {
    mysql,pool
}


// if pool is not used. this can be used for small requests. pool is great tho 

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'organdonation',
//   port: 3306
// });

// database connection
// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");    
// } else {
//     console.log("Error connecting database ... nn"+ err);    
// }
// });