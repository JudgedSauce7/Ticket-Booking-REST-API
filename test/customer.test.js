const expect = require("chai").expect;
const assert = require("chai").assert;
const request = require("supertest");
const test = require("./app.test");
const app = require("../app");
const customer = require("../models/ticket.model");

describe("Customer API", () => {
  before((done) => {
    test
      .conn()
      .then(() => done())
      .catch((err) => {
        done(err);
      });
  });

  describe("GET /customer/all", () => {
    it("It should get all customers", (done) => {
      request(app)
        .get("/customer/all")
        .then((res) => {
          assert.typeOf(res.body, "array");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /customer/book", () => {
    it("It should book tickets and store in DB", (done) => {
      request(app)
        .post("/ticket/add")
        .send({ time: "2020-08-31T05:00" })
        .then((res) => {
          expect(res.status).to.equal(200) ||
            expect(res.body).to.have.property("err");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
