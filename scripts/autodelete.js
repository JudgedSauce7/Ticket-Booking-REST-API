const ticket = require("../models/ticket.model");

module.exports = {
  run: async function () {
    await ticket.deleteMany({ expired: true });
    console.log("All expired tickets deleted !");
  },
};
