import request from "supertest";
import app from "../src/app.js";
import HttpStatus from "http-status-codes";

describe("POST /newsletter", () => {
  it("should return success message", (done) => {
    const data = {
      email: "mason07b_j112l@vixej.com",
      dateOfBirth: "1999-05-11",
      campaignId: "507f1f77bcf86cd799439011",
      gender: "male",
      firstName: "Test",
    };
    request(app)
      .post("/newsletter")
      .send(data)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({
        message:
          "Now you are subscribed to the newsletter, you will receive a welcome email soon",
      })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return some required filds are empty message", (done) => {
    const data = {
      // empty body
    };
    request(app)
      .post("/newsletter")
      .send(data)
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect({
        message: "Email, date of birth or campaignId is empty",
      })
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
