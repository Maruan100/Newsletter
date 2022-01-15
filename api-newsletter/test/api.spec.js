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

describe("POST /newsletter", () => {
  it("should return success message", (done) => {
    request(app)
      .post("/newsletter")
      .send(data)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({
        message:
          "Now you are subscribed to the newsletter, you will receive a welcome email soon",
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return some required filds are empty message", (done) => {
    request(app)
      .post("/newsletter")
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
