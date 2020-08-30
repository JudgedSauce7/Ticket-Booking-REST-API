# 🎬 Movie Ticket Booking API

---

Ticket Booking REST API made using Node.js, Express and MongoDB.

### 📦 Dependencies

```bash
express
mongoose
cors
node-cron
dotenv
```

### 🔰 Install

```bash
$   npm i
```

### 💨 Run

```bash
$   node app.js
```

---

## { ... } REST API

Has ticket and customer routes.

### 🎫Ticket Routes

- #### Get all available tickets for all times

  **URL :** `/ticket/all`
  **Method :** `GET`
  **URL Params :** None
  **Data Params :** None
  **Success Response :** `Status 200`

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

  **URL :** `/ticket/:time`
  **Method :** `GET`
  **URL Params :** `time = [YYYY-MM-DDTHH:MM]`
  **Data Params :** None
  **Success Response :** `Status 200`

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

  **Error Response :** `Status 404`

  ```json
  {
    "err": "No tickets found for that time."
  }
  ```

- #### Add tickets for a particular time

  **URL :** `/ticket/add`
  **Method :** `POST`
  **URL Params :** None
  **Data Params :** time

  ```
  {
    "time": "YYYY-MM-DDTHH:MM" //Required
  }
  ```

  **Success Response :** `Status 201`

  ```json
  {
    "success": "Ticket with ID : {id} created for time {time}"
  }
  ```

  **Error Response :** `Status 400`

  ```json
  {
    "err": "20 Tickets already exist for time {time}. Cannot create more than 20 tickets."
  }
  ```

- #### Update timing for a particular ticket

  **URL :** `/ticket/update`
  **Method :** `PUT`
  **URL Params :** None
  **Data Params :** `id` `time`

  ```
  {
    "id": ObjectID, //Required
    "time": "YYYY-MM-DDTHH:MM" // Required
  }
  ```

  **Success Response :** `Status 201`

  ```json
  {
    "success": "Successfully updated time from {oldtime} to {newtime}"
  }
  ```

  **Error Response :** `Status 404`

  ```json
  {
    "err": "No ticket with that ID exists"
  }
  ```

- #### Delete a particular ticket

  **URL :** `/ticket/delete`
  **Method :** `DELETE`
  **URL Params :** None
  **Data Params :** `id`

  ```
  {
    "id": ObjectID // Required
  }
  ```

  **Success Response :** `Status 200`

  ```json
  {
    "success": "Successfully deleted ticket with id {id}"
  }
  ```

  **Error Response :** `Status 404`

  ```json
  {
    "err": "No ticket with that ID exists"
  }
  ```

- #### Get customer details for a particular ticket (if booked)
  **URL :** `/ticket/get-customer/:id`
  **Method :** `GET`
  **URL Params :** `id = [ObjectId]`
  **Data Params :** None
  **Success Response :** `Status 200`
  ```
  {
    "_id" : ObjectId,
    "name" : String,
    "phone" : String,
    "tickets" : [...]
  }
  ```
  **Error Response :** `Status 404`
  ```json
  {
    "err": "No ticket with that ID exists"
  }
        OR
  {
    "err": "That ticket hasn't been booked yet"
  }
  ```

---

### 🧑 Customer Routes

- #### Get all customers in the database along with their booked tickets

  **URL :** `/customer/all`
  **Method :** `GET`
  **URL Params :** None
  **Data Params :** None
  **Success Response :** `Status 200`

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

  **URL :** `/customer/book`
  **Method :** `POST`
  **URL Params :** None
  **Data Params :** `name` `phone` `time` `tickets`

  ```
  {
    "name": String, //Required
    "phone": String, //Required
    "time": Date, //Required
    "tickets": Number //Required
  }
  ```

  **Success Response :** `Status 200`

  ```json
  {
    "success": " {tickets} tickets booked successfully !"
  }
  ```

  **Error Response :** `Status 401`

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

  **URL :** `/customer/add`
  **Method :** `POST`
  **URL Params :** None
  **Data Params :** `name` `phone`

  ```
  {
    "name": String, //Required
    "phone": String //Required
  }
  ```

  **Success Response :** `Status 200`

  ```json
  {
    "success": "Customer added successfully"
  }
  ```

  **Error Response :** `Status 400`

  ```json
  {
    "err": "Customer already exists"
  }
  ```

- #### Fetch details for a given customer.

  **URL :** `/customer/:name`
  **Method :** `GET`
  **URL Params :** `name = [String]`
  **Data Params :** None
  **Success Response :** `Status 200`

  ```
  {
    "id" : ObjectId,
    "name" : String,
    "phone" : String,
    "tickets" : [...]
  }
  ```

  **Error Response :** `Status 400`

  ```json
  {
    "err": "No customer with name {name} exists"
  }
  ```

---

## 💾 Auto-running Scripts

- #### Auto-expire

  `Marks tickets as expired if there is a difference of 8 hours between ticket time and current time. Runs every minute asynchronously.`

- #### Auto-delete
  `Deletes tickets from the database if they are expired. Runs every hour asynchronously.`
