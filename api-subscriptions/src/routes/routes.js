import { Router } from "express";
import SubscriptionsController from "../controllers/subscriptions.controller";
import Auth from "../controllers/auth.controller";

const routes = Router()
  /**
   *  @swagger
   *   components:
   *     securitySchemes:
   *       AccessToken:
   *         type: apiKey
   *         in: header
   *         name: x-auth-token
   */

  /**
   * @swagger
   * components:
   *  schemas:
   *    Subscription:
   *      type: object
   *      properties:
   *        _id:
   *          type: string
   *          description: the auto-generated id of subscription
   *        email:
   *          type: string
   *          description: the email for the subscription
   *        firstName:
   *          type: string
   *          description: user first name
   *        gender:
   *          type: string
   *          description: user gender
   *        dateOfBirth:
   *          type: date
   *          description: user date of birth
   *        active:
   *          type: boolean
   *          description: subscription status (default is true)
   *        campaignId:
   *          type: string
   *          description: id of the campaign
   *      required:
   *        - email
   *        - dateOfBirth
   *        - campaignId
   *      example:
   *        _id: 61e0602036e6f400126b4d16
   *        email: myemail@company.com
   *        firstName: Steve
   *        dateOfBirth: 1999-05-11
   *        campaignId: 507f1f77bcf86cd799439011
   *        active: true
   *        gender: male
   *    SubscriptionNotFound:
   *      type: object
   *      properties:
   *        message:
   *          type: string
   *          description: A message for the not found subscription
   *      example:
   *        message: Subscription not found
   *
   *  parameters:
   *    subscriptionId:
   *      in: path
   *      name: id
   *      required: true
   *      schema:
   *        type: string
   *      description: the subscription id
   */

  /**
   * @swagger
   * /:
   *  get:
   *    summary: Returns a list of Subscriptions
   *    tags: [Subscriptions]
   *    security:
   *      - AccessToken: []
   *    responses:
   *      200:
   *        description: the list of Subscriptions
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Subscription'
   */
  .get("/", Auth.ensureAuth, SubscriptionsController.fetchSubscriptions)

  /**
   * @swagger
   * /{id}:
   *  get:
   *    summary: get a subscription by Id
   *    tags: [Subscriptions]
   *    security:
   *      - AccessToken: []
   *    parameters:
   *      - $ref: '#/components/parameters/subscriptionId'
   *    responses:
   *      200:
   *        description: The Found subscription
   *        content:
   *          application/json:
   *            schema:
   *            $ref: '#/components/schemas/Subscription'
   *      404:
   *        description: the subscription was not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SubscriptionNotFound'
   */
  .get(
    "/:id([0-9a-fA-F]{24})",
    Auth.ensureAuth,
    SubscriptionsController.readSubscription
  )

  /**
   * @swagger
   * /:
   *  post:
   *    summary: create a subscription
   *    tags: [Subscriptions]
   *    security:
   *      - AccessToken: []
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Subscription'
   *    responses:
   *      200:
   *        description: the subscription was successfully created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Subscription'
   *      400:
   *        description: some required file are empty
   *        content:
   *          application/json:
   *            type: object
   *            properties:
   *              message:
   *                type: string
   *                description: A message that say some required file are empty
   *            example:
   *              message: Email, date of birth or campaignId is empty
   */
  .post("/", Auth.ensureAuth, SubscriptionsController.createSubscription)

  /**
   * @swagger
   * /{id}:
   *  delete:
   *    summary: delete a subscription by id
   *    tags: [Subscriptions]
   *    security:
   *      - AccessToken: []
   *    parameters:
   *      - $ref: '#/components/parameters/subscriptionId'
   *    responses:
   *      200:
   *        description: the subscription was deleted and the user is unsubscribed from the newsletter
   *        content:
   *          application/json:
   *            type: object
   *            properties:
   *              message:
   *                type: string
   *                description: A message that say the subscription was deleted
   *            example:
   *              message: Unsubscribed from the newsletter
   *      404:
   *        description: subscription not found in db
   *        content:
   *          application/json:
   *            type: object
   *            properties:
   *              message:
   *                type: string
   *                description: A message that say the subscription was not found
   *            example:
   *              message: Subscription not found
   */
  .delete(
    "/:id([0-9a-fA-F]{24})",
    Auth.ensureAuth,
    SubscriptionsController.deleteSubscription
  );

export default routes;
