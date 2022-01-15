import HttpStatus from "http-status-codes";
import Subscriptions from "../models/subscription.js";
import RequestService from "../helpers/request-service.js";

async function fetchSubscriptions(req, res) {
  const subscriptions = await Subscriptions.find();
  res.status(HttpStatus.OK).json({
    subscription: subscriptions,
  });
}

async function readSubscription(req, res) {
  const subscription = await Subscriptions.findById(req.params.id);
  if (!subscription) {
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `Subscription not found` });
  }
  res.status(HttpStatus.OK).json({
    subscription: subscription,
  });
}

async function createSubscription(req, res) {
  const { email, firstName, gender, dateOfBirth, campaignId } = req.body;

  if (!email || !dateOfBirth || !campaignId) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `Email, date of birth or campaignId is empty` });
  }

  const subscription = new Subscriptions({
    email,
    firstName,
    gender,
    dateOfBirth,
    campaignId,
  });

  try {
    const { data } = await RequestService.request.post(
      "notifications/",
      subscription
    );
    await subscription.save();
    res.status(HttpStatus.OK).json({
      message:
        "Now you are subscribed to the newsletter, you will receive a welcome email soon",
    });
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `Subscription could not be saved: ${error}` });
  }
}

async function deleteSubscription(req, res) {
  const subscription = await Subscriptions.findById(req.params.id);
  if (!subscription) {
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `Subscription not found` });
  }
  try {
    const { data } = await RequestService.request.post(
      "notifications/unsubscribe/",
      subscription
    );
    await Subscriptions.deleteOne({ _id: req.params.id });
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
}

export default {
  fetchSubscriptions,
  readSubscription,
  createSubscription,
  deleteSubscription,
};
