import mongoose from "mongoose";
import express, { json } from "express";
import routes from "./routes/routes.js";
const port = process.env.PORT || 8083;

//MongoDB
const dbURI =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "local"
    ? "mongodb+srv://dev:tests@cluster0.japt8.mongodb.net/test"
    : "mongodb://mongo:27017/subscriptions";
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions.js";
const specs = swaggerJsDoc(options);

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, dbOptions);
    console.log("MongoDB connected!");
    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

app.use(json());
app.use("/subscriptions", [routes]);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
