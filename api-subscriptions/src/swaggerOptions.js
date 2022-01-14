export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscriptions API",
      version: "1.0.0",
      description: "Api to manage subscriptions",
    },
    servers: [
      {
        url: "http://localhost:8083/subscriptions",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
