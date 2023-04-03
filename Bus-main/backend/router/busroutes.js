const express = require("express");
const router = express.Router();
const busroute = require("../model/busroute");
const mongoose = require("mongoose")
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
            
          $lookup:
            {
              from: "businfos",
              localField: "Bus_id",
              foreignField: "_id",
              as: "busroute"
            }
       }
      ]
      const detail = await busroute.aggregate(aggregatequery);
      res.json(detail);
    } catch (err) {
      res.send("Error" + err);
    }
  });


  router.post("/agi",async(req,res)=>{
   
    const{id,Source} = req.body
    try {
     
  
  
        
      var aggregatequery = [
        { 
            $match : { "Bus_id" : new mongoose.Types.ObjectId(id.toString()), "Source":Source   }
         },
        {
            
          $lookup:
            {
              from: "businfos",
              localField: "Bus_id",
              foreignField: "_id",
              as: "businfos"
            }
       },
      ]
      const detail = await busroute.aggregate(aggregatequery);
      res.json(detail);
    } catch (err) {
      res.send("Error" + err);
    }
  })
  
router.post("/", async (req, res) => {
  const { Bus_id, Source, Destination, Arrival_time, Departure_time, Boarding_point,Dropping_point } =
    req.body;

  try {
    await busroute.create({
      Bus_id,
      Source,
      Destination,
      Arrival_time,
      Departure_time,
      Boarding_point,
      Dropping_point,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" ,error});
   
  }
});

module.exports = router;
