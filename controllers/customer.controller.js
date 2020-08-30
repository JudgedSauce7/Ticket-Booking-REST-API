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

  book: async (req, res) => {
    let cust = await customer.findOne({ name: req.body.name });
    if (cust == null) {
      const newCust = new customer({
        name: req.body.name,
        phone: req.body.phone,
      });
      cust = await newCust.save();
    }
    // console.log(cust);
    const id = cust._id;
    const numTickets = req.body.numTickets;
    const available = await ticket.find({ time: req.body.time, booked: false });
    const numAvailable = available.length;
    // console.log(available);
    if (numAvailable == 0) {
      res.json({ error: "No tickets available for this time slot" });
    } else if (numAvailable < numTickets) {
      res.json({ error: `Only ${numAvailable} ticket(s) are available !` });
    } else {
      let cnt = 0;
      while (cnt != numTickets) {
        // console.log(available[cnt]._id);
        await ticket.updateOne(
          { _id: available[cnt]._id },
          { booked: true, customer: cust._id }
        );
        // console.log(cust._id);
        await customer.updateOne(
          { _id: cust._id },
          { $push: { tickets: available[cnt] } }
        );
        cnt = cnt + 1;
      }
      res.json({ success: `${numTickets} booked successfully !` });
    }
  },
};

module.exports = customerController;
