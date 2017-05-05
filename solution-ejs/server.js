var express = require('express');
var app = express();
var tunrRouter = require('./config/routes.js');

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(tunrRouter);
app.use(express.static('public'));

app.listen(3000, function() {
	console.log("Listening on localhost:3000");
});