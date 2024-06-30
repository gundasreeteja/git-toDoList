const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/public/js/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function (req, res) {
  const day = date.getTodayDate();
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  console.log(req.body);
  if (req.body.list == "Work List") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItems: workItems });
});

app.post("/work", function (req, res) {
  workItems.push(req.body.newItem);
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
