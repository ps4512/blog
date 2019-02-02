const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`app listening on port ${port}!`));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
  title: "汤唯",
  image: "http://seattlechinesetimes.com/wp-content/uploads/2016/05/%E6%B1%A4%E5%94%AF-1024x683.jpg",
  body: "汤唯的照片，嘿嘿😁",
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, result){
    if(err) {
      console.log("error");
    } else {
      res.render("index", {blogs: result});
    }
  })
})

app.get("/", function(req, res){
  res.redirect("/blogs");
})
