const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

app.use("/api/v2/trackjob/",require("./api_trackjob"))
app.use("/api/v2/trackjobline/",require("./api_trackjobline"))

app.listen(8085, () =>{
    console.log("Backend is running...")
})