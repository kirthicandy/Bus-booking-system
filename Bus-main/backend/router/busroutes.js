const express = require("express");
const router = express.Router();
const busroute = require("../model/busroute");
const mongoose = require("mongoose");



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
    console.log("err",err)
    res.send("Error" + err);
  }
});



router.get("/:id", async (req, res) => {
  try {
    const detail = await busroute.findById(req.params.id);
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
router.put("/updateroute/:id", async (req, res) => {
  try{
    const details = await busroute.findByIdAndUpdate(req.params.id,req.body,{

            new:true})
    const pg = await details.save()
    res.json(pg)

}
catch(err){
     console.log('err',err)
}
});
router.get("/view/:id", async (req, res) => {
  try {
    const detail = await busroute.find({bus_id:req.params.id});
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const detail = await busroute.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});



module.exports = router;
