const customer = require("../models/customer.model");
const ticket = require("../models/ticket.model");

const customerController = {
  getAll: async (req, res) => {
    const all = await customer.find();
    res.json(all);
  },

  getCustomer: async (req, res) => {
    const cust = await customer.find({ name: req.params.name });
    res.json(cust);
  },

  addCustomer: async (req, res) => {
    const cust = await customer.find({ name: req.params.name });
    if (cust == null) {
      const newCust = new customer(req.body);
      const savedCust = await newCust.save();
      res.json(savedCust);
    }
    res.send("Already added");
  },

  //   book: async (req, res) => {
  //     const cust = await customer.find({ name: req.body.name });
  //     if (cust == null) {
  //       const newCust = new customer(req.body);
  //       const savedCust = await newCust.save();
  //       res.json(savedCust);
  //     }
  //     res.json(cust);
  //   },
};

module.exports = customerController;
