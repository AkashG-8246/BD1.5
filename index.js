const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

let app = express();
const port = 3000;
app.use(cors());

// API Call: <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>
// Expected Output: 1200
let taxRate = 5;
let discountPercentage = 10;
let loyaltiRate = 2;

app.get('/cart-total', (req, res) => {
  let itemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(totalCartValue(itemPrice, cartTotal).toString());
});

function totalCartValue(itemPrice, cartTotal) {
  return cartTotal + itemPrice;
}

// API Call: <http://localhost:3000/membership-discount?cartTotal=3600&isMember=true>
// Expected Output: 3240
app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(valueafterDiscount(isMember, cartTotal).toString());
});

function valueafterDiscount(isMember, cartTotal) {
  if (isMember) {
    return cartTotal * (1 - discountPercentage / 100);
  } else {
    return cartTotal;
  }
}

// API Call: <http://localhost:3000/calculate-tax?cartTotal=3600>
// Expected Output: 180
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal).toString());
});

function calculateTax(cartTotal) {
  return cartTotal * (taxRate / 100);
}

// API Call: <http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600>
// Expected Output: 6
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(estimateTime(shippingMethod, distance).toString());
});

function estimateTime(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else {
    return distance / 50;
  }
}

// API Call: <http://localhost:3000/shipping-cost?weight=2&distance=600>
// Expected Output: 120

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(shippingCost(weight, distance).toString());
});

function shippingCost(weight, distance) {
  return weight * distance * 0.1;
}

// API Call: <http://localhost:3000/loyalty-points?purchaseAmount=3600>
// Expected Output: 7200
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltiRate;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
