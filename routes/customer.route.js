const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", (req, res) => {
  res.send("Customer Route");
});

router.get("/all", customerController.getAll);

router.post("/add", customerController.addCustomer);

router.get("/:name", customerController.getCustomer);

// router.post("/book", customerController.book);

module.exports = router;
