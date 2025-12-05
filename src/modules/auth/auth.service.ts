import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt from "jsonwebtoken";

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
  };

  const secret = "234njaf934nzjdafj34ui;aldfiad";
  delete user.rows[0].password;
  const token = jwt.sign(jwtPayload, secret, { expiresIn: "3d" });

  return { token, userRows: user.rows[0] };
};

export const authServices = {
  loginUserIntoDB,
};
