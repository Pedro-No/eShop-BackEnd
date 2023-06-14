const express = require("express");
const router = express.Router();
const ShoppingCart = require("../models/shoppinCart.model");
const User = require("../models/User.model");

//get cart info
router.get("/:userid/cart", async (req, res) => {
  try {
    const { userid } = req.params;
    const cart = await ShoppingCart.findOne({ owner: userid });

    await cart.populate("items");
    res.json(cart);
  } catch (err) {
    console.log(err);
  }
});

//change cart info
router.post("/:userid/cart/:illustrationid", async (req, res) => {
  try {
    const { userid, illustrationid } = req.params;

    const cart = await ShoppingCart.findOne({ owner: userid }).populate("items");

    let cartArray = [];

    if (cart.items.length === 0) {
      cartArray.push(illustrationid);
      await ShoppingCart.findByIdAndUpdate(cart._id, { items: cartArray });
    } else {
      cart.items.forEach((item) => {
        cartArray.push(item);
      });

      cartArray.push(illustrationid);
      await ShoppingCart.findByIdAndUpdate(cart._id, { items: cartArray });
    }

    let response = await ShoppingCart.findOne({ owner: userid });

    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

//delete from cart
router.put("/:userid/cart/del/:illustrationid", async (req, res) => {
  try {
    const { userid, illustrationid } = req.params;
    const cart = await ShoppingCart.findOne({ owner: userid });

    let cartArray = [];

    cart.items.forEach((item) => {
      if (!item._id === illustrationid) {
        cartArray.push(item);
      }
    });

    await ShoppingCart.findByIdAndUpdate(cart._id, { items: cartArray });
    cart.items = cartArray;
    res.json(cart);
  } catch (err) {
    console.log(err);
  }
});

//get bought info
router.get("/:userid/paid", async (req, res) => {
  try {
    const { userid } = req.params;
    const userDB = await User.findById(userid).populate("bought");
    let response = userDB.bought;
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

//add bought to user
router.put("/:userid/paid/:illustrationid", async (req, res) => {
  try {
    const { userid, illustrationid } = req.params;
    const userDB = await User.findById(userid);

    await User.findByIdAndUpdate(userDB, {
      $push: { bought: illustrationid },
    });
    res.json("user bought updated");
  } catch (error) {
    console.log(error);
  }
});

router.put("/:userid/favourites-add/:illustrationid", async (req, res) => {
  try {
    const { userid, illustrationid } = req.params;

    const userDB = await User.findById(userid);

    await User.findByIdAndUpdate(userDB, {
      $push: { favourites: illustrationid },
    });
    res.json("user favourites updated");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
