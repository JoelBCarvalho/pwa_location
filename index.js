const https = require("https"),
  fs = require("fs"),
  helmet = require("helmet");

const options = {
  key: fs.readFileSync("/home/x240/junk/pwa-server/keys/key.pem"),
  cert: fs.readFileSync("/home/x240/junk/pwa-server/keys/cert.pem"),
  dhparam: fs.readFileSync("/home/x240/junk/pwa-server/keys/dh-strong.pem"),
    passphrase: '1234'
};

var express = require("express");
var app     = express();
app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static("."));

var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.listen(3000);

https.createServer(options, app).listen(3080);

console.log("Running at Port 3000");
