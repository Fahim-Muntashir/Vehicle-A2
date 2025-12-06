import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const getAllUser = async () => {
  const result = await pool.query(
    `
    SELECT id,name,email,age,created_at,updated_at FROM users
    `
  );

  return result;
};

const getSingleUser = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id,name,email,age,created_at,updated_at FROM users WHERE email=$1
    `,
    [email]
  );

  return result;
};

export const userServices = { getAllUser, getSingleUser };
