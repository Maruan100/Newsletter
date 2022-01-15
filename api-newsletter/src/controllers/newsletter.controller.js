import HttpStatus from "http-status-codes";
import RequestService from "../helpers/request-service.js";

async function subscribe(req, res) {
  const { email, dateOfBirth, campaignId } = req.body;

  if (!email || !dateOfBirth || !campaignId) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `Email, date of birth or campaignId is empty` });
  }

  try {
    const { data } = await RequestService.request.post(
      "subscriptions/",
      req.body
    );
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
}

async function unsubscribe(req, res) {
  try {
    const { data } = await RequestService.request.delete(
      `subscriptions/${req.params.id}`
    );
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
}

export default {
  subscribe,
  unsubscribe,
};
