import express from "express";
import {
  storeProductServices,
  getListProductServices,
  getProductByIdServices,
  updateProductServices,
  deleteProductServices,
} from "../services/productServices.js";

const router = express.Router();

router.post("/", storeProductServices);
router.get("/", getListProductServices);
router.get("/detail", getProductByIdServices);
router.put("/", updateProductServices);
router.delete("/", deleteProductServices);

export default router;
