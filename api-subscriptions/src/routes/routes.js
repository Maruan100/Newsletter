import { Router } from "express";
import SubscriptionsController from "../controllers/subscriptions.controller";
import Auth from "../controllers/auth.controller"

const routes = Router()
  .get("/", Auth.ensureAuth, SubscriptionsController.fetchSubscriptions)
  .get("/:id([0-9a-fA-F]{24})", Auth.ensureAuth, SubscriptionsController.readSubscription)
  .post("/", Auth.ensureAuth, SubscriptionsController.createSubscription)
  .delete("/:id([0-9a-fA-F]{24})", Auth.ensureAuth, SubscriptionsController.deleteSubscription);

export default routes;
