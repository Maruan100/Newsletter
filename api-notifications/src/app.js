import express, { json } from "express";
import routes from "./routes/routes.js";
const port = process.env.PORT || 8082;

const app = express();

app.use(json());

app.use("/notifications", [routes]);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

export default app;
