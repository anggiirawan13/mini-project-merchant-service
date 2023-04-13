import util from "util";
import db from "../../database/connection.js";
import validatePassword from "../../utils/passwdValidator.js";
import {
  getAccountIdByNameRepositories,
  storeAccountRepositories,
  updateAccountRepositories,
} from "../repositories/accountRepositories.js";
import { getAccountId } from "../../middleware/basicAuth.js";

const query = util.promisify(db().query).bind(db());

const storeAccountServices = async (req, res) => {
  try {
    await doStore(req, false);

    res.status(201).json({ isSuccess: true, message: "STORE_SUCCESS" });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const updateAccountServices = async (req, res) => {
  try {
    const currentUserId = await getAccountId(req);

    if (currentUserId !== req.body.id)
      throw { code: 403, message: "ACCESS_FORBIDDEN" };

    await doStore(req, true);

    res.status(201).json({ isSuccess: true, message: "UPDATE_SUCCESS" });
  } catch (err) {
    if (!err.code) err.code = 500;

    res.status(err.code).json({ isSuccess: false, message: err.message });
  }
};

const doStore = async (req, isUpdate) => {
  checkRequiredFields(req, isUpdate);

  const nameExist = await getAccountIdByNameRepositories(req.body.name);

  if (nameExist) throw { code: 400, message: "DATA_ALREADY_EXIST" };

  const passwordValid = validatePassword(req.body.password);

  if (!passwordValid) throw { code: 400, message: "PASSWORD_INVALID" };

  isUpdate ? updateAccountRepositories(req) : storeAccountRepositories(req);
};

const checkRequiredFields = (req, isUpdate) => {
  let message = "";

  if (isUpdate) if (!req.body.id) message = "ID_REQUIRED";

  if (!req.body.name) message = "NAME_REQUIRED";
  if (!req.body.password) message = "PASSWORD_REQUIRED";
  if (!req.body.address) message = "ADDRESS_REQUIRED";
  if (!req.body.phone_number) message = "PHONE_NUMBER_REQUIRED";

  if (message) throw { code: 400, message };
};

export { storeAccountServices, updateAccountServices };
