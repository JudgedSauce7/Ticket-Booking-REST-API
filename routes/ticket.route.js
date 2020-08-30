const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

router.get("/", (req, res) => {
  res.send("Ticket Route");
});

router.get("/all", ticketController.getAll);

router.get("/:time", ticketController.forTime);

router.post("/add", ticketController.add);

router.put("/update/", ticketController.updateTime);

router.delete("/delete", ticketController.delete);

module.exports = router;
