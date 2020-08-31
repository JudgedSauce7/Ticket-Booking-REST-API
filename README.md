# 🎬 Movie Ticket Booking API

Ticket Booking REST API made using Node.js, Express and MongoDB.

### 📦 Dependencies

```bash
express
mongoose
cors
node-cron
dotenv
chai
mocha
supertest
mockgoose
```

### 🔰 Install

```bash
$   npm i
```

### 🚀 Run

```bash
$   node app.js
```
---
## 🚨 Unit Testing
Unit testing has been done on the individual routes using `mocha`, an extensive javascript testing for Node.js, paired with `chai`, an assertion library.

```bash
$   npm run test
```

---
## 💾 Auto-running Scripts - cron jobs

- #### Auto-expire

  `Marks tickets as expired if there is a difference of 8 hours between ticket time and current time. Runs every minute asynchronously.`

- #### Auto-delete
  `Deletes tickets from the database if they are expired. Runs every hour asynchronously.`
---
## { ... } REST API

Has ticket and customer routes.<br>
Tested using Postwoman/Hoppscotch API client. Screenshots [here](./screenshots).<br>

### 🎫Ticket Routes

- #### Get all available tickets for all times

  **URL :** `/ticket/all`<br>
  **Method :** `GET`<br>
  **URL Params :** None<br>
  **Data Params :** None<br>
  **Success Response :** `Status 200`<br>

  ```
  [
      {
          "_id" : ObjectId,
          "booked" : Boolean,
          "expired" : Boolean,
          "time" : Date,
          "customer" : ObjectId
      }
      ...
  ]
  ```

- #### Get all tickets for a particular time

  **URL :** `/ticket/:time`<br>
  **Method :** `GET`<br>
  **URL Params :** `time = [YYYY-MM-DDTHH:MM]`<br>
  **Data Params :** None<br>
  **Success Response :** `Status 200`<br>

  ```
  [
      {
          "_id" : ObjectId,
          "booked" : Boolean,
          "expired" : Boolean,
          "time" : Date,
          "customer" : ObjectId
      }
      ...
  ]
  ```

  **Error Response :** `Status 404`<br>

  ```json
  {
    "err": "No tickets found for that time."
  }
  ```

- #### Add tickets for a particular time

  **URL :** `/ticket/add`<br>
  **Method :** `POST`<br>
  **URL Params :** None<br>
  **Data Params :** time<br>

  ```
  {
    "time": "YYYY-MM-DDTHH:MM" //Required
  }
  ```

  **Success Response :** `Status 201`<br>

  ```json
  {
    "success": "Ticket with ID : {id} created for time {time}"
  }
  ```

  **Error Response :** `Status 400`<br>

  ```json
  {
    "err": "20 Tickets already exist for time {time}. Cannot create more than 20 tickets."
  }
  ```

- #### Update timing for a particular ticket

  **URL :** `/ticket/update`<br>
  **Method :** `PUT`<br>
  **URL Params :** None<br>
  **Data Params :** `id` `time`<br>

  ```
  {
    "id": ObjectID, //Required
    "time": "YYYY-MM-DDTHH:MM" // Required
  }
  ```

  **Success Response :** `Status 201`<br>

  ```json
  {
    "success": "Successfully updated time from {oldtime} to {newtime}"
  }
  ```

  **Error Response :** `Status 404`<br>

  ```json
  {
    "err": "No ticket with that ID exists"
  }
  ```

- #### Delete a particular ticket

  **URL :** `/ticket/delete`<br>
  **Method :** `DELETE`<br>
  **URL Params :** None<br>
  **Data Params :** `id`<br>

  ```
  {
    "id": ObjectID // Required
  }
  ```

  **Success Response :** `Status 200`<br>

  ```json
  {
    "success": "Successfully deleted ticket with id {id}"
  }
  ```

  **Error Response :** `Status 404`<br>

  ```json
  {
    "err": "No ticket with that ID exists"
  }
  ```

- #### Get customer details for a particular ticket (if booked)
  **URL :** `/ticket/get-customer/:id`<br>
  **Method :** `GET`<br>
  **URL Params :** `id = [ObjectId]`<br>
  **Data Params :** None<br>
  **Success Response :** `Status 200`<br>
  ```
  {
    "_id" : ObjectId,
    "name" : String,
    "phone" : String,
    "tickets" : [...]
  }
  ```
  **Error Response :** `Status 404`<br>
  ```json
  {
    "err": "No ticket with that ID exists"
  }
  ```
  OR `Status 400`
  ```json
  {
    "err": "That ticket hasn't been booked yet"
  }
  ```

---

### 🧑 Customer Routes

- #### Get all customers in the database along with their booked tickets

  **URL :** `/customer/all`<br>
  **Method :** `GET`<br>
  **URL Params :** None<br>
  **Data Params :** None<br>
  **Success Response :** `Status 200`<br>

  ```
  [
      {
        "_id" : ObjectId,
        "name" : String,
        "phone" : String,
        "tickets" : [...]
      }
      ...
  ]
  ```

- #### Book tickets for a customer

  **URL :** `/customer/book`<br>
  **Method :** `POST`<br>
  **URL Params :** None<br>
  **Data Params :** `name` `phone` `time` `tickets`<br>

  ```
  {
    "name": String, //Required
    "phone": String, //Required
    "time": Date, //Required
    "tickets": Number //Required
  }
  ```

  **Success Response :** `Status 200`<br>

  ```json
  {
    "success": " {tickets} tickets booked successfully !"
  }
  ```

  **Error Response :** `Status 401`<br>

  ```json
  {
    "err": "No ticket available for time {time}"
  }
        OR
  {
    "err": "Only {number} ticket(s) are available !"
  }
  ```

- #### Add a new cutomer to the database.

  **URL :** `/customer/add`<br>
  **Method :** `POST`<br>
  **URL Params :** None<br>
  **Data Params :** `name` `phone`<br>

  ```
  {
    "name": String, //Required
    "phone": String //Required
  }
  ```

  **Success Response :** `Status 200`<br>

  ```json
  {
    "success": "Customer added successfully"
  }
  ```

  **Error Response :** `Status 400`<br>

  ```json
  {
    "err": "Customer already exists"
  }
  ```

- #### Fetch details for a given customer.

  **URL :** `/customer/:name`<br>
  **Method :** `GET`<br>
  **URL Params :** `name = [String]`<br>
  **Data Params :** None<br>
  **Success Response :** `Status 200`<br>

  ```
  {
    "id" : ObjectId,
    "name" : String,
    "phone" : String,
    "tickets" : [...]
  }
  ```

  **Error Response :** `Status 404`<br>

  ```json
  {
    "err": "No customer with name {name} exists"
  }
  ```

---

**P.S.** This was the problem statement of **Zomentum Hiring Assignment**. Thanks for making me do this. Learnt a lot!