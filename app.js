const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);

const workItemsSchema = {
  name: String,
};
const WorkItem = mongoose.model("WorkItem", workItemsSchema);

let items = [];
let workItems = [];

// Regular to do list
app.get("/", async function (req, res) {
  // Fetch all the Items from the Item Schema (collection) using Item model
  await Item.find({})
    .then(function (itemsFound) {
      // mongoose.connection.close();
      items = itemsFound.map((item) => item.name);
      console.log(items);
      console.log("Successfully fetched the items from DB");
    })
    .catch(function (err) {
      console.log(err);
    });

  res.render("list", { listTitle: "Today", newItems: items });
});

app.post("/", function (req, res) {
  // console.log(req.body);
  if (req.body.list == "Work List") {
    // workItems.push(req.body.newItem);
    const newItem = new WorkItem({ name: req.body.newItem });
    newItem
      .save()
      .then(function (savedItem) {
        console.log("Saved Work Item to DB: " + savedItem.name);
      })
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/work");
  } else {
    // items.push(req.body.newItem);
    const newItem = new Item({ name: req.body.newItem });
    newItem
      .save()
      .then(function (savedItem) {
        console.log("Saved Item to DB: " + savedItem.name);
      })
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/");
  }
});

// Work to do list
app.get("/work", async function (req, res) {
  await WorkItem.find({})
    .then(function (itemsFound) {
      // mongoose.connection.close();
      workItems = itemsFound.map((item) => item.name);
      console.log(workItems);
      console.log("Successfully fetched the work items from DB");
    })
    .catch(function (err) {
      console.log(err);
    });
  res.render("list", { listTitle: "Work List", newItems: workItems });
});

app.post("/delete", async function (req, res) {
  // Delete operation is only done for today list and not work list
  await Item.deleteOne({ name: req.body.checkbox })
    .then(function () {
      console.log("Deleted successfully");
    })
    .catch(function (err) {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
