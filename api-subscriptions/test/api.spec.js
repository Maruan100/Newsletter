import request from "supertest";
import app from "../src/app.js";
import HttpStatus from "http-status-codes";

const subscription = {
  active: true,
  _id: "61e2f6b3939cbc275cc8b4cc",
  email: "testmai1@testmail.com",
  firstName: "Test",
  gender: "male",
  dateOfBirth: "1999-05-11T00:00:00.000Z",
  campaignId: "507f1f77bcf86cd799439011",
  __v: 0,
};
const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndjcmVtaW5vX2U5NDU2Nzc1NjVAdml4ZWouY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJnZW5kZXIiOiJtYWxlIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTA1LTExIiwiY2FtcGFpZ25JZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjA3OTc1OX0.vnhOZGihe9GVT06TszfU9EOA_GukiBGl2KTm01f1EAA";

describe("GET /subscriptions", () => {
  it("should return subscriptions list", (done) => {
    request(app)
      .get("/subscriptions")
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /subscriptions/:id", () => {
  it("should return subscription data", (done) => {
    request(app)
      .get(`/subscriptions/${subscription._id}`)
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({
        subscription,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /subscriptions", () => {
  it("should return created subscription", (done) => {
    request(app)
      .post("/subscriptions")
      .set("X-Auth-Token", authToken)
      .send(subscription)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return required filds are empty message", (done) => {
    request(app)
      .post("/subscriptions")
      .set("X-Auth-Token", authToken)
      .send({})
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect({
        message: "Email, date of birth or campaignId is empty",
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("DELETE /subscriptions", () => {
  it("should return data not found", (done) => {
    request(app)
      .delete("/subscriptions/61e0322a3e8992356b9e145d")
      .set("X-Auth-Token", authToken)
      .send({})
      .expect(HttpStatus.NOT_FOUND)
      .expect("Content-Type", /json/)
      .expect({
        message: "Subscription not found",
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
