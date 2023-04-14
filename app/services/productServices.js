import db from "../../database/connection.js";
import util from "util";
import {
  storeProductRepositories,
  getListProductRepositories,
  getProductByIdRepositories,
  updateProductRepositories,
  deleteProductRepositories,
  getProductByNameRepositories,
} from "../repositories/productRepositories.js";
import { getAccountId } from "../../middleware/basicAuth.js";

const query = util.promisify(db().query).bind(db());

const storeProductServices = async (req, res) => {
  try {
    checkRequiredFields(req, false);

    await doStore(req, false);

    res.status(201).json({ isSuccess: true, message: "STORE_SUCCESS" });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const getListProductServices = async (req, res) => {
  try {
    let account_id = await getAccountId(req);

    const data = await getListProductRepositories(account_id);

    if (data.length <= 0) throw { code: 404, message: "DATA_NOT_FOUND" };

    res
      .status(200)
      .json({ isSuccess: true, message: "GET_LIST_SUCCESS", data });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const getProductByIdServices = async (req, res) => {
  try {
    let message = "";

    if (!req.query.id) message = "ID_REQUIRED";

    if (message) throw { code: 400, message };

    let account_id = await getAccountId(req);

    const data = await getProductByIdRepositories(req.query.id, account_id);

    if (!data) throw { code: 404, message: "DATA_NOT_FOUND" };

    res
      .status(200)
      .json({ isSuccess: true, message: "GET_DATA_SUCCESS", data });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const updateProductServices = async (req, res) => {
  try {
    checkRequiredFields(req, true);

    let account_id = await getAccountId(req);

    const productExist = await getProductByIdRepositories(
      req.body.id,
      account_id
    );

    if (!productExist) throw { code: 404, message: "DATA_NOT_FOUND" };

    await doStore(req, true);

    res.status(201).json({ isSuccess: true, message: "UPDATE_SUCCESS" });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const deleteProductServices = async (req, res) => {
  try {
    let message = "";

    if (!req.query.id) message = "ID_REQUIRED";

    if (message) throw { code: 400, message };

    let account_id = await getAccountId(req);

    const productExist = await getProductByIdRepositories(
      req.query.id,
      account_id
    );

    if (!productExist) throw { code: 404, message: "DATA_NOT_FOUND" };

    await deleteProductRepositories(req.query.id, account_id);

    res.status(200).json({ isSuccess: true, message: "DELETE_SUCCESS" });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const doStore = async (req, isUpdate) => {
  let account_id = await getAccountId(req);

  const productExist = await getProductByNameRepositories(
    req.body.name,
    account_id
  );

  if (productExist) throw { code: 400, message: "DATA_ALREADY_EXIST" };

  isUpdate
    ? updateProductRepositories(req, account_id)
    : storeProductRepositories(req, account_id);
};

const checkRequiredFields = (req, isUpdate) => {
  let message = "";

  if (isUpdate) if (!req.body.id) message = "ID_REQUIRED";

  if (!req.body.name) message = "NAME_REQUIRED";
  if (!req.body.quantity) message = "QUANTITY_REQUIRED";
  if (!req.body.price) message = "PRICE_REQUIRED";

  if (message) throw { code: 400, message };
};

export {
  storeProductServices,
  getListProductServices,
  getProductByIdServices,
  updateProductServices,
  deleteProductServices,
};
