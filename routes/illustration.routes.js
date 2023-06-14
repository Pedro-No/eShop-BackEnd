const express = require("express");
const router = express.Router();
const Illustration = require("../models/Illustration.model");
const fileUploader = require('../config/cloudinary.config');

//Find all Illustration
router.get("/illustration", async (req, res) => {
  try {
    let response = await Illustration.find()
    res.json(response);
  } catch {
    console.log(error)
  }
});

//Create Illustration
//upload
router.post("/illustration/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

//create
router.post("/illustration", async (req,res) => {
  try {
    const {author, name, price, date, imageUrl} = req.body;
    const response = await Illustration.create({author, name, imageUrl, price, date});
    res.json(response);
  } catch (error) {
    console.log(error)
  }
})

//Find specific Illustration
router.get("/illustration/:id", async (req, res) => {
  try {
    let {id} = req.params
    let response = await Illustration.findById(id)
    res.json(response);
  } catch {
    console.log(error)
  }
});

//Find Illustrations of user
router.get("/illustration/owner/:ownerid", async (req, res) => {
  const {ownerid} = req.params
  try {
    const response = await Illustration.find({author: ownerid})
    res.json(response);
  } catch (error) {
    console.log(error)
  }
})

//Update Illustration
router.put("/illustration/:id", async (req,res) => {

  const {id} = req.params

  try {
    const {name, price, date} = req.body;
    await Illustration.findByIdAndUpdate(id, {name, price, date} ,{new:true});
    let response = "Illustration updated";
    res.json(response);
  } catch (error) {
    console.log(error)
  }
})

//Delete  Illustration
router.delete("/illustration/:id", async (req,res) => {

  const {id} = req.params

  try {
    await Illustration.findByIdAndDelete(id)
    response = "Artwork deleted"
    res.json(response);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
