import util from "util";
import db from "../../database/connection.js";
import moment from "moment";
import encodePasswd from "../../utils/encodePasswd.js";

const query = util.promisify(db().query).bind(db());

const storeAccountRepositories = (req) => {
  const passHash = encodePasswd(req.body.password);
  query(
    "INSERT INTO accounts (name, password, address, join_date, phone_number) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.name,
      passHash,
      req.body.address,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      req.body.phone_number,
    ]
  );
};

const updateAccountRepositories = (req) => {
  const passHash = encodePasswd(req.body.password);
  query(
    "UPDATE accounts SET name = ?, password = ?, address = ? phone_number = ? WHERE id = ?",
    [
      req.body.name,
      passHash,
      req.body.address,
      req.body.phone_number,
      req.body.id,
    ]
  );
};

const getAccountIdByNameRepositories = async (name) => {
  const getProduct = await query(
    "SELECT id FROM accounts WHERE name = ?",
    name
  );

  return getProduct.length > 0 ? getProduct[0].id : null;
};

const getAccountPasswordByNameRepositories = async (name) => {
  const getProduct = await query(
    "SELECT password FROM accounts WHERE name = ?",
    name
  );

  return getProduct.length > 0 ? getProduct[0].password : null;
};

export {
  storeAccountRepositories,
  updateAccountRepositories,
  getAccountIdByNameRepositories,
  getAccountPasswordByNameRepositories,
};
