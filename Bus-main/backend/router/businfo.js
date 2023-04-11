const express = require("express");
const router = express.Router();
const businfo = require("../model/Businfo");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const detail = await businfo.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const detail = await businfo.findById(req.params.id);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.post("/", async (req, res) => {
  const {  Bus_name, Bus_number, Available_seats, Bus_Type, Price } =
    req.body;

  try {
    await businfo.create({
    
      Bus_name,
      Bus_number,
      Available_seats,
      Bus_Type,
      Price,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
   
  }
});
router.post("/:id",async(req,res)=>{
  const{id} = req.body
  try {
    // const detail = await businfo.findById(id);

    let id = req.body.id

      
    var aggregatequery = [
      { 
          $match : { "_id" : new mongoose.Types.ObjectId(id.toString()),    }
       },
      {
          
        $lookup:
          {
            from: "busroutes",
            localField: "_id",
            foreignField: "Bus_id",
            as: "busroutes"
          }
     },
     { 
      $match : {"$Source" : "Chennai" }
   },
    ]
    const detail = await businfo.aggregate(aggregatequery);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
})
router.delete('/:id',async(req,res)=>{
  try{
      const details = await businfo.findById(req.params.id)
      const pg = await details.remove()
      res.json(pg)

  }
  catch(err){
       console.log('err',err)
  }
})
router.put('/update/:id',async(req,res)=>{
  try{
      const details = await businfo.findByIdAndUpdate(req.params.id,req.body,{

              new:true})
      const pg = await details.save()
      res.json(pg)

  }
  catch(err){
       console.log('err',err)
  }
})
module.exports = router;
