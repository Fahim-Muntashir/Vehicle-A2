import { pool } from "../../database/db";

const createBooking = async (booking: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = booking;

  const vehicleRes = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  const vehicle = vehicleRes.rows[0];
  if (!vehicle) throw new Error("Vehicle not found");

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  // calculate price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
  const total_price = days * vehicle.daily_rent_price;

  // booking
  const bookingRes = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return { ...bookingRes.rows[0], vehicle };
};
const getBookings = async (user: { id: number; role: string }) => {
  if (user?.role === "admin") {
    const bookingRes = await pool.query(`SELECT * FROM bookings`);

    return bookingRes.rows;
  } else {
    const res = await pool.query(
      `SELECT b.*, v.vehicle_name, v.registration_number, v.type
       FROM bookings b
       JOIN vehicles v ON b.vehicle_id=v.id
       WHERE b.customer_id=$1`,
      [user.id]
    );
    return res.rows;
  }
};

const updateBookings = async (bookingId: number, status: string) => {
  console.log(status);
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  if (!status) throw new Error("Status must be provided");

  const booking = bookingRes.rows[0];
  if (!booking) throw new Error("Booking not found");

  await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2`, [
    status,
    bookingId,
  ]);

  let vehicle;

  if (!status) throw new Error("Status must be provided");

  if (status === "returned") {
    const vehicleRes = await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING *`,
      [booking.vehicle_id]
    );
    vehicle = vehicleRes.rows[0];
  }

  return { ...booking, status, vehicle };
};

export const bookingServices = { createBooking, getBookings, updateBookings };
