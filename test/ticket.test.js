const expect = require("chai").expect;
const assert = require("chai").assert;
const request = require("supertest");
const test = require("./app.test");
const app = require("../app");
const ticket = require("../models/ticket.model");

describe("Tickets API", () => {
  before((done) => {
    test
      .conn()
      .then(() => done())
      .catch((err) => {
        done(err);
      });
  });

  describe("GET /ticket/all", () => {
    it("It should get all tickets", (done) => {
      request(app)
        .get("/ticket/all")
        .then((res) => {
          assert.typeOf(res.body, "array");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /ticket/add", () => {
    it("It should add ticket to database", (done) => {
      request(app)
        .post("/ticket/add")
        .send({ time: "2020-08-31T05:00" }) // Hard-coded for the time being
        .then((res) => {
          expect(res.status).to.equal(201);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /ticket/get-customer", () => {
    it("It should get customer object", (done) => {
      request(app)
        .post("/ticket/get-customer")
        .send({ id: "5f4bd020ed41301774cd8532" }) // Hard-coded for the time being
        .then((res) => {
          expect(res.body).to.have.property("name");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
