const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Ticket Booking API !");
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
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
