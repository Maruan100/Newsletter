import HttpStatus from "http-status-codes";
import RequestService from "../helpers/request-service";

async function subscribe(req, res) {
  try {
    const { data } = await RequestService.request.post("subscriptions/", req.body);
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.response.status).json(err.response.data);
  }
}

async function unsubscribe(req, res) {
  try {
    const { data } = await RequestService.request.delete(`subscriptions/${req.params.id}`);
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.response.status).json(err.response.data);
  }
}

export default {
  subscribe,
  unsubscribe,
};
