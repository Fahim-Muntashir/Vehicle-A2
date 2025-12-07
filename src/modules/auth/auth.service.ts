import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const signupUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, role, phone } = payload;
  const hashPassword = await bcrypt.hash(password as string, 12);
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,role,phone) VALUES($1,$2,$3,$4,$5 ) RETURNING * `,
    [name, email, hashPassword, role, phone]
  );

  const user = result.rows[0];
  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  return result;
};

const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (user.rows.length === 0) {
    throw new Error("User not found");
  }

  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  delete user.rows[0].password;
  delete user.rows[0].created_at;
  delete user.rows[0].updated_at;
  delete user.rows[0].password;
  const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "3d",
  });

  return { token, user: user.rows[0] };
};

export const authServices = {
  loginUserIntoDB,
  signupUser,
};
