var express = require('express');
var bodyParser = require('body-parser');
const cookierParser = require('cookie-parser')
var app = express();
app.use(express.static(__dirname + '/public'));
const Instagram = require('instagram-web-api')
var routes = require('./routes/index');
//app.use(cookierParser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//console.log(client);
app.set('view engine', 'ejs');
app.use('/', routes);
app.listen(5000, function () {
    console.log('Express app listening on port 3000'); 
});