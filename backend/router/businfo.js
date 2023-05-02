const express = require("express");
const router = express.Router();
const businfo = require("../model/Businfo");
const mongoose = require("mongoose");



/**
 * @swagger
 * components:
 *   schemas:
 *     businfo:
 *       type: object
 *       required:
 *         - Bus_name,
 *         - Bus_number,
 *         - Available_seats,
 *         - Bus_Type,
 *         - Price,
 *       properties:
 *         Bus_name:
 *           type: string
 *
 *         Bus_number:
 *           type: number
 *
 *         Available_seats:
 *           type: string
 *
 *         Bus_Type:
 *           type: string
 *
 *         Price:
 *           type: string
 *
 */
/**
 *@swagger
  * tags:
 *   name: Bus Details
 * /businfo:
 *   get:
 *     summary: get api for businfo
 *     tags: [Bus Details]
 *     responses:
 *       200:
 *         description: get api for businfo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/businfo'
 */
router.get("/", async (req, res) => {
  try {
    const detail = await businfo.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

/**
 *@swagger
 * /businfo/{id}:
 *   get:
 *     summary: get api for busroute by id
 *     tags: [Bus Details]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID required
 *           schema:
 *             type: string
 *
 *     responses:
 *       200:
 *         description: get api for busroute by id
 *
 */
router.get("/:id", async (req, res) => {
  try {
    const detail = await businfo.findById(req.params.id);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

/**
 *@swagger
 * /businfo:
 *   post:
 *     summary:  Post api for businfo.
 *     tags: [Bus Details]
 *     parameters: []
 *     requestBody: {
 *       
 *       content: {
 *     
 *          "application/json": {
 *             schema: {
 *                $ref: '#/components/schemas/businfo'
 *             },
 *           },
 *       },
 *     }
 *     responses: [
 *
 *       200: {
 *         description: Post api for busroute,
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
/**
 *@swagger
 * /businfo/{id}:
 *   post:
 *     summary: Lookup aggregate for busroute by match
 *     tags: [Bus Details]
 *     parameters: 
 *          - in: query
 *            name: Bus_number
 *            required: true
 *            schema:
 *              type: string
 * 
 *     requestBody: 
 *       
 *       content: 
 *     
 *          "application/json": 
 *             schema: 
 *               type: object
 *               properties:
 *                 id: 
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
router.post("/:id",async(req,res)=>{
  const{id} = req.body
  try {
    // const detail = await businfo.findById(id);

    let id = req.body.id
    const {Bus_number} = req.query
    const filteritem = {}

      
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
    if(Bus_number){
      filteritem.Bus_number = Bus_number
    }
    const detail3 = await detail.find(filteritem)
    
    res.json(detail3);
  } catch (err) {
    res.send("Error" + err);
  }
})
/**
 *@swagger
 * /businfo/update/{id}:
 *   put:
 *     summary:  put api for businfo.
 *     tags: [Bus Details]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID required
 *           schema:
 *             type: string
 *     requestBody: {
 *       
 *       content: {
 *     
 *          "application/json": {
 *             schema: {
 *                $ref: '#/components/schemas/businfo'
 *             },
 *           },
 *       },
 *     }
 *     responses: [
 *
 *       200: {
 *         description: Post api for businfo,
 *       },
 * 
 *       400: {
 *         description:  Server Error.
 *       }
 *     ]
 *       
 *         
 */
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
router.put("/delete/:id", async (req, res) => {
  console.log("id",req.params.id)
  try {
    const detail = await businfo.findOne({_id:req.params.id});
    detail.deleted = true
    await detail.save()
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
    console.log(err)
  }
});
module.exports = router;
