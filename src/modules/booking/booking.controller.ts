import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const booking = await bookingServices.createBooking(data);

    return res.status(201).json({
      success: true,
      message: "Booking created Successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; role: string };
    const bookings = await bookingServices.getBookings(user);

    return res.status(200).json({
      success: true,
      message:
        user.role === "admin"
          ? "Booking retrived successfully"
          : "Your bookings retrived successfully",
      data: bookings,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const { status } = req.body;

    const updateBooking = await bookingServices.updateBookings(
      bookingId,
      status
    );

    let message =
      status === "cancelled"
        ? "Booking Cancelled Successfully"
        : status === "returned"
        ? "Bokking marked as returned. vahicle is now available"
        : "booking Updated";

    return res.status(200).json({
      success: true,
      message,
      data: updateBooking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = { createBooking, getBookings, updateBookings };
