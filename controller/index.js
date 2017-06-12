var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

router.get("/", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { articles: doc });
    }
  });
});

router.get("/scrape", function(req, res) {
  request("https://www.http://edm.com/articles", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".read").each(function(i, element) {
      var result = {};
      var title = $(this).children("h2").text();
      var text = $(this).children("p").text();

      result.title = title;
      result.text = text;

      var entry = new Article(result);

      if (title && text) {
        // Save to Mongodb
        entry.save(function(err, doc) {
          if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
      
      }

    });
  });
  res.send("Success!");
});

// Get from Mongodb
router.get("/articles", function(req, res) {
  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    } else {
      console.log(doc);
      res.json(doc);
    }
  });

});