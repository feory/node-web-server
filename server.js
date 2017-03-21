const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log();
  fs.appendFile("server.log", log + "\n", function(err){

    if (err){

      console.log("Unable to append to server.log");
    }

  });
  next();

});

// app.use(function(request, response, next){
//
//   response.render("404.hbs");
//
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", function(){

  return new Date().getFullYear();

});

app.get("/", function(request, response){

  response.render("home.hbs",{

    page: "Home",
    message: "Welcome to my nightmare!",

  })
});

app.get("/about", function(request,response){

  response.render("about.hbs", {

    pageTitle: "About Page Style",

  });

});

app.get("/bad", function(request,response){

  response.send({

    error: "Faillleddd",

  })
});

app.listen(3000, function(){

  console.log("Server is up on port 3000");

});
