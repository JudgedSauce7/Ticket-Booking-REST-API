const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv/config");

const autodelete = require("./scripts/autodelete.js");
var autoexpire = require("./scripts/autoexpire.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ res: "Welcome to Ticket Booking API !" });
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
    cron.schedule("* * * * *", autodelete.run);
    cron.schedule("0 * * * *", autoexpire.run);
  })
  .catch((err) => {
    console.log(err);
  });

const ticketRoute = require("./routes/ticket.route");
const customerRoute = require("./routes/customer.route");

app.use("/ticket", ticketRoute);
app.use("/customer", customerRoute);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
