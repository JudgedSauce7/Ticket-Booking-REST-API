const ticket = require("../models/ticket.model");

function eightHours(tickettime) {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  current = Date.parse(
    year + "-" + month + "-" + date + "T" + hours + ":" + minutes
  );
  return current - Date.parse(tickettime) > 28800000; // Eight Hours
}

module.exports = {
  run: async function () {
    const tickets = await ticket.find();
    for (const element of tickets) {
      if (eightHours(element.time)) {
        await ticket.updateOne({ _id: element._id }, { expired: true });
      }
    }
  },
};
