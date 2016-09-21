//API NUMBER : 649913818463
//API KEY : AIzaSyBuy3sUVS1a_pya64hzdENJd8H2THzLPeA

var express = require('express');
var app = express();
var webPush = require('web-push');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var https = require('https');
var server;
var options = {
  pfx: fs.readFileSync('ssl.pfx'),
  passphrase: 'password'
};

app.set('port', 5000);
app.use(express.static(__dirname + '/'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(bodyParser.json())


webPush.setGCMAPIKey('AIzaSyBuy3sUVS1a_pya64hzdENJd8H2THzLPeA');

app.post('/register', function(req, res) {
  console.log("A real world application would store the subscription info."+ req.body.endPoint);
  res.sendStatus(201);
});

app.post('/sendNotification', function(req, res) {
  try{
var endPoint = "https://android.googleapis.com/gcm/send/eZL3JdLd2t0:APA91bH6T6PBf93x5XrE1f5mGaiBbfwtiny7Sz_dRn_Ywxwq19mm7_Fgyb-zLRX1TUKjtp0riEDJXmpTE9pz3zs856T58PxTag1g--3FSj5VdfD2GoGUMCPdOn7NhVlpNtOy5qXHZXHc";
console.log("Sending notification to clien:");
console.log('title:'+ req.body.endpoint + '\nicon:' +req.body.icon+'\nbody: '+ req.body.body+'\nurl:'+ req.body.link+"\nKey: "+req.body.key+"\nAuth :"+req.body.authSecret);
webPush.sendNotification(endPoint, {
  TTL: 4000,
  payload: JSON.stringify({
    'title': req.body.title,
    'icon': req.body.icon,
    'body': req.body.body,
    url: req.body.link
  }),
  userPublicKey: "BMdnhur2H63CDgEYVcbXW3+JvXLKXWRP9jqytpdlvNugbxtspeY5UoRDYCxNes7hQdsIMJmqx4e8EmwfTO+siAk=",
  userAuth:"Hhrj+b/uOn3OJuV0vbZXfQ==",
})
.then(function() {
  console.log("Sending subscription succuss");
  res.writeHead(201, {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers"});
        res.sendStatus(201);

      }),function()
{
  console.log("Sending subscription failure");  
};
}
catch(e)
{
  console.log("Exception Sending notification to clien:"+ e.stack);
}
});
// ndStatus(201);
// }, function(err) {
// console.log(err);
// });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

