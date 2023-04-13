import express from "express";
import accountEndpoints from "../app/endpoints/accountEndpoints.js";
import productEndpoints from "../app/endpoints/productEndpoints.js";

const app = express.Router();

app.use("/accounts", accountEndpoints);
app.use("/products", productEndpoints);

export default app;
