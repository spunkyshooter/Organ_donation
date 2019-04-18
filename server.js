const express    = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
//to allow cross origin request
app.use(cors());

//import routes
const donate = require('./routes/api/donate');
const receive = require('./routes/api/receive');
const receptionist = require('./routes/api/receptionist');
const hospital = require('./routes/api/hospital').router;
//use routes
app.use('/api/donate',donate);
app.use('/api/receive',receive);
app.use('/api/receptionist',receptionist);
app.use('/api/hospital',hospital);

app.listen(3002,(err)=>{
  if(err) console.log(err)
  else console.log("server running at port 3002...")
});