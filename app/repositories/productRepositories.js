import db from "../../database/connection.js";
import util from "util";

const query = util.promisify(db().query).bind(db());

const storeProductRepositories = async (req, account_id) => {
  await query("INSERT INTO products (account_id, name, quantity, price) VALUES (?, ?, ?, ?)", [
    account_id,
    req.body.name,
    req.body.quantity,
    req.body.price,
  ]);
};

const getListProductRepositories = async (account_id) => {
  const getProducts = await query("SELECT * FROM products WHERE account_id = ?", account_id);

  return getProducts;
};

const getProductByIdRepositories = async (id, account_id) => {
  const getProduct = await query("SELECT * FROM products WHERE id = ? AND account_id = ?", [id, account_id]);

  return getProduct[0];
};

const getProductByNameRepositories = async (name, account_id) => {
  const getProduct = await query("SELECT * FROM products WHERE name = ? AND account_id = ?", [name, account_id]);

  return getProduct[0];
};

const updateProductRepositories = async (req, account_id) => {
  await query("UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ? AND account_id = ?", [
    req.body.name,
    req.body.quantity,
    req.body.price,
    req.body.id,
    account_id,
  ]);
};

const deleteProductRepositories = async (id, account_id) => {
  await query("DELETE FROM products WHERE id = ? AND account_id = ?", [id, account_id]);
};

export {
  storeProductRepositories,
  getListProductRepositories,
  getProductByIdRepositories,
  getProductByNameRepositories,
  updateProductRepositories,
  deleteProductRepositories,
};
