import mysql from "mysql";
import dotenv from "dotenv";

const ENV = dotenv.config().parsed;

const db = () => {
  const connection = mysql.createConnection({
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
  });

  connection.connect();

  return connection;
};

export default db;
