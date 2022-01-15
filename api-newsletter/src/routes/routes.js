import { Router } from "express";
import NewsletterController from "../controllers/newsletter.controller.js";

const routes = Router()
  .post("/", NewsletterController.subscribe)
  .post("/unsubscribe/:id([0-9a-fA-F]{24})", NewsletterController.unsubscribe);

export default routes;
