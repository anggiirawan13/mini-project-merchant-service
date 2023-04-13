import express from "express";
import {
  storeAccountServices,
  updateAccountServices,
} from "../services/accountServices.js";

const router = express.Router();

router.post("/", storeAccountServices);
router.put("/", updateAccountServices);

export default router;
