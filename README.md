# Newsletter

microservices to manage a newsletter system


## Basic Usage

*Local usage: (run in each api directory)*
```
npm install
NODE_ENV=local npm start
```

*Container usage: (very easy) this will run the 3 apis container and a mongo client*
```
docker-compose build
docker-compose up
```


*Testing:*
> If you want to run the api-newsletter tests you need to have api-subscriptions and api-notifications up locally

> If you want to run the api-subscriptions tests you need to have api-notifications up locally

> If you want to run the api-notifications tests no other server is needed

```
npm test
```


## What does each microservice do?
- ### api-newsletter (public) :8081 
> It is the public api to which the client connects:


**POST:** [newsletter/](#) *To subscribe to the newsletter, body example:* 
``` 
{
	"email": "testmai1@testmail.com",
	"dateOfBirth": "1999-05-11",
	"campaignId": "507f1f77bcf86cd799439011",
	"gender": "male",
	"firstName": "Test"
}
```

**POST:** [newsletter/unsubscribe/:{id}](#) *Unsubscribe to the newsletter, subscriptionId required in the params, example: [newsletter/unsubscribe/61e03ad3e3249e396192ded0](#)*


- ### api-subscriptions (secured) :8083 
>Manages subscription information and connects to the database:

It has a documentation made with swagger, to see it, run the server locally and go to the route: [http://localhost:8083/docs/](http://localhost:8083/docs/) 
if you want to test calls locally you will need an authorization token you can copy this, also can be use in the header for postman calls: 
``` 
X-Auth-Token:  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndjcmVtaW5vX2U5NDU2Nzc1NjVAdml4ZWouY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJnZW5kZXIiOiJtYWxlIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTA1LTExIiwiY2FtcGFpZ25JZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjA3OTc1OX0.vnhOZGihe9GVT06TszfU9EOA_GukiBGl2KTm01f1EAA
```


- ### api-notifications (secured) :8082
>Manages sending email, **currently sending email works and a welcome email is sent using mailchimp that takes a few minutes**:

**POST:** [notifications/](#) It makes a call to mailchimp to add the email to the list of subscribers and sends a welcome email, body example: Expect same body that we send in ***api-newsletter*** but send by ***api-subscription***

**POST:** [notifications/unsubscribe](#) It makes a call to mailchimp to unsubscribe the email to the newsletter, body example: Expect the subscription object send by  ***api-subscription***


## Framewors/libraries used

- [Express](https://www.npmjs.com/package/express)
- [Axios](https://www.npmjs.com/package/axios) *To make calls between microservices*
- [Mongoose](https://www.npmjs.com/package/mongoose) *To connect to DB and use schemas for modeling data*
- [Http-status-codes](https://www.npmjs.com/package/http-status-codes) *Provides a list of status codes like 200 or 404 with a more clearer syntax*
- [Jwt-simple](https://www.npmjs.com/package/jwt-simple) *To decode auth tokens in the secured microservices*
- [Moment](https://www.npmjs.com/package/moment) *To set expiration date of a token (in this case is set to 30 days)*
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) && [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) *Used to create a swagger documentation inside api-subscription*
- [Mocha](https://www.npmjs.com/package/mocha) && [Supertest](https://www.npmjs.com/package/supertest) *Used for testing*



