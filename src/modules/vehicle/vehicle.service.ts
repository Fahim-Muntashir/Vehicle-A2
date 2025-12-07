import { pool } from "../../database/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles( vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status) VALUES($1,$2,$3,$4,$5) RETURNING * `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  const vehicle = result.rows[0];
  delete vehicle.created_at;
  delete vehicle.updated_at;

  return result;
};

const getAllVehicles = async () => {
  const result = await pool.query("SELECT * FROM vehicles");
  return result.rows;
};

const getVehicleById = async (id: number) => {
  const result = await pool.query("SELECT * FROM vehicles WHERE id=$1", [id]);

  return result.rows[0];
};

const updateVehicle = async (id: number, payload: Record<string, unknown>) => {
  const fields = Object.keys(payload);
  const values = Object.values(payload);
  delete payload.registration_number;

  const setQuery = fields
    .map(
      (field, index) => `
  ${field}=$${index + 1}`
    )
    .join(", ");

  const result = await pool.query(
    `UPDATE vehicles SET ${setQuery} WHERE id=$${
      fields.length + 1
    } RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

const deleteVehicle = async (id: number) => {
  await pool.query("DELETE FROM vehicles WHERE id=$1", [id]);
  return;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
