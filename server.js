// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/",(req,res)=>{

  const newDate=new Date();
  res.json({
    "unix":newDate.getTime(),
    "utc":newDate.toUTCString()
  })


})

// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  // res.json({greeting: 'hello API'});
  let dateString=req.params.date_string;
  if(dateString.includes('-')){
  
    const dateCheck =new Date(dateString);

  if(dateCheck!="Invalid Date"){
  
    res.json({unix:dateCheck.getTime(),
  
      "utc":dateCheck.toUTCString()})
  }
else{
  res.json({
    "error":"Invalid Date"
  })
}
}
 else {
dateString=parseInt(dateString)

date=new Date(dateString)

res.json({
  "unix": date.getTime(),
  "utc":date.toUTCString()
})
 }   
});


// listen for requests :)
var listener = app.listen(process.env.PORT||5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
