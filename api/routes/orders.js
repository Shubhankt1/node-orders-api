const express = require("express");

// Router
const router = express.Router();

// Mongoose
const mongoose = require("mongoose");

// Order model
const Order = require("../models/order");
const product = require("../models/product");

// Get all Orders
router.get("/", (req, res, next) => {
  Order.find()
    .populate("product", "name")
    .select("product quantity _id")
    .exec()
    .then((docs) => {
      console.log(docs);
      const response = {
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            order_requests: {
              details: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id,
              },
              delete: {
                type: "DELETE",
                url: "http://localhost:3000/orders/" + doc._id,
              },
            },
          };
        }),
        requests: {
          add: {
            type: "POST",
            url: "http://localhost:3000/orders/",
          },
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Add an Order
router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  order
    .save()
    .then((result) => {
      console.log("Order:\n", order);
      const response = {
        message: "Added Order here.",
        created_order: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          order_requests: {
            details: {
              type: "GET",
              url: "http://localhost:3000/orders/" + result._id,
            },
            delete: {
              type: "DELETE",
              url: "http://localhost:3000/orders/" + result._id,
            },
          },
        },
        requests: {
          list: {
            type: "GET",
            url: "http://localhost:3000/orders/",
          },
        },
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .populate("product", "_id name price")
    .select("product quantity _id")
    .exec()
    .then((doc) => {
      if (!doc) {
        console.log("No Produt found with ID: ", id);
        return res.status(404).json({
          message: "No Product found for provided ID.",
        });
      }
      const response = {
        message: "Order Details Found!",
        order: {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          order_requests: {
            delete: {
              type: "DELETE",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          },
        },
        requests: {
          list: {
            type: "GET",
            url: "http://localhost:3000/orders/",
          },
          add: {
            type: "POST",
            url: "http://localhost:3000/orders/",
          },
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Order Deleted!",
        result: result,
        requests: {
          list: {
            type: "GET",
            url: "http://localhost:3000/orders/",
          },
          add: {
            type: "POST",
            url: "http://localhost:3000/orders/",
          },
        },
      });
    })
    .catch((err) => {
      console.log("Error:\n", err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
