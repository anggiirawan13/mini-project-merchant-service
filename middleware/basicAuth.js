import auth from "basic-auth";
import bcrypt from "bcrypt";
import db from "../database/connection.js";
import util from "util";
import {
  getAccountIdByNameRepositories,
  getAccountPasswordByNameRepositories,
} from "../app/repositories/accountRepositories.js";

const query = util.promisify(db().query).bind(db());

const basicAuth = async (req, res, next) => {
  let isNext = validateEndpointWithoutAuth(req.method, req.path);
  if (isNext) return next();

  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Basic")
  )
    return res
      .status(404)
      .json({ isSuccess: false, message: "ACCESS_FORBIDDEN" });

  const user = auth(req);
  const userPass = await getAccountPasswordByNameRepositories(user.name);

  if (!userPass)
    return res
      .status(404)
      .json({ isSuccess: false, message: "DATA_NOT_FOUND" });
  const passVerify = bcrypt.compareSync(user.pass, userPass);
  if (passVerify) next();
  else
    return res
      .status(401)
      .json({ isSuccess: false, message: "PASSWORD_WRONG" });
};

const validateEndpointWithoutAuth = (reqMethod, reqEnpoint) => {
  let endpoint = String(reqEnpoint).toLowerCase();
  let method = String(reqMethod).toUpperCase();

  if (method === "POST") {
    let arrEndpointPostWithoutAuth = ["/accounts"];
    if (arrEndpointPostWithoutAuth.includes(endpoint)) return true;
  }

  return false;
};

const getAccountId = async (req) => {
  const user = auth(req);
  const id = await getAccountIdByNameRepositories(user.name);

  return id;
};

export { basicAuth, getAccountId };
