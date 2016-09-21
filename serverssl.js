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
  // A real world application would store the subscription info.
  //res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello, encrypted world!');

  console.log("A real world application would store the subscription info."+ req.body.body);
  res.sendStatus(201);
});

app.post('/sendNotification', function(req, res) {
try{
console.log("Sending notification to clien:");
console.log('title:'+ req.body.title + '\nicon:' +req.body.icon+'\nbody: '+ req.body.body+'\nurl:'+ req.body.link+"\nKey: "+req.body.key+"\nAuth :"+req.body.authSecret);
webPush.sendNotification(req.body.endpoint, {
  TTL: 4000,
  payload: JSON.stringify({
    'title': req.body.title,
    'icon': req.body.icon,
    'body': req.body.body,
    url: req.body.link
  }),
  userPublicKey: req.body.key,
  userAuth: req.body.authSecret,
})
.then(function() {
  res.writeHead(201, {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers"});
        res.sendStatus(201);

      });
}
catch(e)
{
  console.log(e.stack);
}

});
// ndStatus(201);
// }, function(err) {
// console.log(err);
// });


// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

server = https.createServer(options, app).listen(app.get('port'), function () {
  port = server.address().port;
  console.log('Listening on https://127.0.0.1:' + port);
  console.log('Listening on https://' + server.address().address + ':' + port);
  console.log('Listening on https://localhost.daplie.com:' + port);
});
// .then(function() {
// res.sendStatus(201);
// }, function(err) {
// console.log(err);
// });




