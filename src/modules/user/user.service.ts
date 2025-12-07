import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const getAllUser = async () => {
  const result = await pool.query(
    `
    SELECT id,name,email,phone, FROM users
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

const updateUser = async (
  id: number,
  data: { name?: string; phone: string; age?: number }
) => {
  const fields = [];
  const values: any[] = [];
  let idx = 1;
  for (const key in data) {
    fields.push(`${key}=$${idx}`);
    values.push(data[key as keyof typeof data]);
    idx++;
  }

  values.push(id);

  const query = `update users SET ${fields.join(
    ","
  )} WHERE id=$${idx} RETURNING id,name,email,phone`;
  const result = await pool.query(query, values);

  return result;
};

const deleteUser = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id=$1 RETURNING id,name,email`,
    [id]
  );
  return result;
};

export const userServices = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
