const express = require("express");
const router = express.Router();
const reverseroute = require("../model/reverseroute");
const mongoose = require("mongoose")
router.get("/", async (req, res) => {
  try {
    const detail = await reverseroute.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.get("/aggregate/:id", async (req, res) => {
    try {
        let id = req.params.id

        console.log(id)
      var aggregatequery = [
        { 
            $match : { "_id" : new mongoose.Types.ObjectId(id.toString())  }
         },
        {
            
          $lookup:
            {
              from: "businfos",
              localField: "Bus_id",
              foreignField: "_id",
              as: "reverseroutes"
            }
       }
      ]
      const detail = await reverseroute.aggregate(aggregatequery);
      res.json(detail);
    } catch (err) {
      res.send("Error" + err);
    }
  });
router.post("/", async (req, res) => {
  const { Bus_id, Source, Destination, Arrival_time, Departure_time, Boarding_point } =
    req.body;

  try {
    await reverseroute.create({
      Bus_id,
      Source,
      Destination,
      Arrival_time,
      Departure_time,
      Boarding_point,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" ,error});
   
  }
});

module.exports = router;
