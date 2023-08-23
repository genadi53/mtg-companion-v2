import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "~/env.mjs";

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "mtg_db2",
  password: env.DATABASE_PASS,
});

export const db = drizzle(poolConnection);
