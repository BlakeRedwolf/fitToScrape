var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

var controller = require("./controller");
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/edmscaper");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Error @: ", error);
});

db.once("open", function() {
  console.log("Success!");
});

var hbs = exphbs.create({
  layoutsDir: "views/layouts",
  defaultLayout: "main"
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', controller);

app.listen(PORT, function() {
  console.log('App listening on port 3000!');
});