const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  ObjectID = require('mongodb').ObjectId;
var MongoClient = require("mongodb").MongoClient;
var mongodb = require('mongodb');
require("./Userdetail");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const url = //"mongodb+srv://mstintern6:mstintern6@cluster0.6z6cdol.mongodb.net/?retryWrites=true&w=majority"
  "mongodb://0.0.0.0:27017";
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.log(e);
  });

const User = mongoose.model("data");
app.post("/submit", async (req, res) => {
  const {index, name, email, dob, address } = req.body;
  try {
    await User.create({index, name, email, dob, address });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.get("/get", async (req, res) => {
  MongoClient.connect(url, await function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo
      .collection("data")
      .find({})
      .toArray(function (err, result) {
        res.send(result)
      });
  });
});

app.delete(`/delete/:id`,async (req,res)=>{
    MongoClient.connect(url, await function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("data").deleteOne({_id: ObjectID(req.params.id)}, function(err, obj) {
          res.send("Item deleted")
        });
      });
})

app.put(`/update/:id`,async (req,res)=>{
  MongoClient.connect(url, await function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      const id = req.params.id;
      dbo.collection("data").updateOne({_id: ObjectID(id)},{$set: req.body},function(err, obj) {
      });
    });
})


app.listen(5000, () => {
  console.log("Server Started");
});
