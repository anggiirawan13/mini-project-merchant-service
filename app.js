import express from "express";
import indexRouter from "./routes/index.js";
import dotenv from "dotenv";
import { basicAuth } from "./middleware/basicAuth.js";

const app = express();
const ENV = dotenv.config().parsed;

app.use(express.json());
app.use(basicAuth);
app.use("/", indexRouter);

app.listen(ENV.SERVER_PORT, () => {
  console.info(`Server running on port ${ENV.SERVER_PORT}`);
});
