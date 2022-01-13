import mongoose from "mongoose";
import express, { json } from "express";
import cors from "cors";
import routes from "./routes/routes.js";
const port = process.env.PORT || 8083;

const dbURI = `mongodb://mongo:27017/subscriptions`;
const dbOptions = { useNewUrlParser: true };

const app = express();
app.use(cors());

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

export { app };
