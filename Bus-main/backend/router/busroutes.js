const express = require("express");
const router = express.Router();
const busroute = require("../model/busroute");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  try {
    const detail = await busroute.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/aggregate", async (req, res) => {
  try {
    // let id = req.body.id

    // console.log(id)
    var aggregatequery = [
      // {
      //     $match : { "_id" : new mongoose.Types.ObjectId(id.toString())  }
      //  },
      {
        $lookup: {
          from: "businfos",
          localField: "bus_id",
          foreignField: "_id",
          as: "busroute",
        },
      },
    ];
    const detail = await busroute.aggregate(aggregatequery);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/agi", async (req, res) => {
  const { id, source } = req.body;
  try {
    var aggregatequery = [
      {
        $match: {
          bus_id: new mongoose.Types.ObjectId(id.toString()),
          source: source,
        },
      },
      {
        $lookup: {
          from: "businfos",
          localField: "bus_id",
          foreignField: "_id",
          as: "businfos",
        },
      },
    ];
    const detail = await busroute.aggregate(aggregatequery);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
  const {
    bus_id,
    source,
    destination,
    arrival_time,
    departure_time,
    available_Seat,
    reserved_seat,
    boarding_point,
    dropping_point,
  } = req.body;

  try {
    await busroute.create({
      bus_id,
      source,
      destination,
      arrival_time,
      departure_time,
      available_Seat,
      reserved_seat,
      boarding_point,
      dropping_point,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", error });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.body;

    const detail = await busroute.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(detail);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
