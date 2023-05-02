const express = require("express");
const router = express.Router();
const booking = require("../model/booking");
const busroute = require("../model/busroute");
const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     booking:
 *       type: object
 *       required:
 *         - bus_id
 *         - user_id
 *         - busroute_id
 *         - user_detail
 *         - boarding_point
 *         - dropping_point
 *         - no_of_seats
 *         - booked_seats
 *         - total_price
 *       properties:
 *         bus_id:
 *           type: string
 *
 *         user_id:
 *           type: string
 *
 *         busroute_id:
 *           type: string
 *
 *         user_detail:
 *           type: array
 *           items:
 *             type: object
 *
 *         boarding_point:
 *           type: string
 *
 *         dropping_point:
 *           type: string
 *
 *         no_of_seats:
 *           type: string
 *
 *         booked_seats:
 *           type: array
 *           items: {
 *             type: string
 *           }
 *
 *         total_price:
 *            type: string
 *
 *
 */
/**
 *@swagger
 * /booking/mybook:
 *   post:
 *     summary: My Booking
 *     tags: [Booking]
 *     parameters: []
 *     requestBody:
 *
 *       content:
 *
 *          "application/json":
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *
 *
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *
 */

router.post("/mybook", async (req, res) => {
  const { user_id } = req.body;
  try {
    const detail = await booking.find({ user_id });
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
/**
 *@swagger
 * /booking/cancel:
 *   put:
 *     summary: Cancellation
 *     tags: [Booking]
 *     parameters: []
 *     requestBody:
 *
 *       content:
 *
 *          "application/json":
 *             schema:
 *               type: object
 *               properties:
 *                 booking_id:
 *                   type: string
 *                 busroute_id:
 *                   type: string
 *                 booked_seats:
 *                   type: array
 *                   items: {
 *                     type: string
 *                   }
 *
 *
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *
 */
router.put("/cancel", async (req, res) => {
  const { booking_id, busroute_id, booked_seats } = req.body;
  try {
    const bookingDoc = await booking.findOne({ _id: booking_id });

    bookingDoc.deleted = true;
    bookingDoc.status = "Cancelled";

    await bookingDoc.save();

    const busrouteDoc = await busroute.findById(busroute_id);
    const newArray = busrouteDoc.reserved_seat.filter(
      (seat) => !booked_seats.includes(seat)
    );
    busrouteDoc.reserved_seat = newArray;
    await busrouteDoc.save();

    res.send({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error: " + err);
  }
});

/**
 *@swagger
 * tags:
 *   name: Booking
 * /booking:
 *   post:
 *     summary:  Post api for booking.
 *     tags: [Booking]
 *     parameters: []
 *     requestBody: {
 *
 *       content: {
 *
 *          "application/json": {
 *             schema: {
 *                $ref: '#/components/schemas/booking'
 *             },
 *           },
 *       },
 *     }
 *     responses: [
 *
 *       200: {
 *         description: Post api for booking,
 *       },
 *
 *       400: {
 *         description:  Server Error.
 *       }
 *     ]
 *
 *
 */
router.post("/", async (req, res) => {
  const {
    bus_id,
    user_id,
    busroute_id,
    user_detail,
    boarding_point,
    dropping_point,
    no_of_seats,
    booked_seats,
    total_price,
  } = req.body;

  try {
    await booking
      .create({
        bus_id,
        user_id,
        busroute_id,
        user_detail,
        boarding_point,
        dropping_point,
        no_of_seats,
        booked_seats,
        total_price,
      })
      .then(async () => {
        await busroute.findByIdAndUpdate(
          { _id: busroute_id },
          { $push: { reserved_seat: { $each: booked_seats } } }
        );
      });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", message: error });
    console.log(error);
  }
});
/**
 *@swagger
 * /booking/{id}:
 *   get:
 *     summary: get api for booking
 *     tags: [Booking]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID required
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: get api for busroute
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/booking'
 */
router.get("/:id", async (req, res) => {
  try {
    const detail = await booking.find({ busroute_id: req.params.id });
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

/**
 *@swagger
 * /booking:
 *   get:
 *     summary: get api for booking
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: get api for busroute
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/booking'
 */
router.get("/", async (req, res) => {
  try {
    const detail = await booking.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
