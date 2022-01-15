import { Router } from "express";
import NotificationsController from "../controllers/notifications.controller.js";
import Auth from "../controllers/auth.controller.js"

 const routes = Router()
   .post("/", Auth.ensureAuth,  NotificationsController.sendNotification)
   .post("/unsubscribe", Auth.ensureAuth, NotificationsController.unsubscribeNotification)

 export default routes;
