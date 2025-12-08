import mysql from "mysql2/promise";
import "dotenv/config";

const connectionOptions = process.env.MYSQL_URI ?? {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "anh123",
  database: process.env.MYSQL_DBNAME || "iot",
  dateStrings: true,
};

export const pool = mysql.createPool(connectionOptions);

console.log("MySQL pool initialized");
