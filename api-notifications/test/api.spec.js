import request from "supertest";
import app from "../src/app.js";
import HttpStatus from "http-status-codes";

const data = {
  email: "testmai1@testmail.com",
  dateOfBirth: "1999-05-11",
  campaignId: "507f1f77bcf86cd799439011",
  gender: "male",
  firstName: "Test",
};
const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndjcmVtaW5vX2U5NDU2Nzc1NjVAdml4ZWouY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJnZW5kZXIiOiJtYWxlIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTA1LTExIiwiY2FtcGFpZ25JZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjA3OTc1OX0.vnhOZGihe9GVT06TszfU9EOA_GukiBGl2KTm01f1EAA";

describe("POST /notifications", () => {
  it("should return success message", (done) => {
    request(app)
      .post("/notifications")
      .send(data)
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({
        message: "Notification sent successfully",
      })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return email is empty", (done) => {
    request(app)
      .post("/notifications")
      .send({})
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect({
        message: "Email fild is empty",
      })
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /notifications/unsubscribe", () => {
  it("should return success message", (done) => {
    request(app)
      .post("/notifications/unsubscribe")
      .send(data)
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({ message: "Unsubscribed from the newsletter" })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return email is empty", (done) => {
    request(app)
      .post("/notifications/unsubscribe")
      .send({})
      .set("X-Auth-Token", authToken)
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect({
        message: "Email fild is empty",
      })
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
