const express = require("express");
const router = express.Router();
const busroute = require("../model/busroute");
const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     busroute:
 *       type: object
 *       required:
 *         - username
 *
 *         - email
 *         - password
 *         - age
 *         - gender
 *       properties:
 *         bus_id:
 *           type: string
 *
 *         source:
 *           type: string
 *
 *         destination:
 *           type: string
 *
 *         arrival_time:
 *           type: date
 *
 *         departure_time:
 *           type: date
 *
 *         available_Seat:
 *           type: string
 *
 *         reserved_seat:
 *           type: array
 *           items: {
 *             type: string
 *           }
 *
 *         boarding_point:
 *           type: array
 *           items: {
 *             type: string
 *           }
 *
 *         dropping_point:
 *            type: array
 *            items: {
 *             type: string
 *           }
 *
 *
 */


/**
 * @swagger
 * tags:
 *   name: Busroute
 * /busroute/aggregate:
 *   get:
 *     summary: Aggregate Api
 *     tags: [Busroute]
 *     responses:
 *       200:
 *         description: List all user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/info'
 */


router.get("/aggregate", async (req, res) => {
  try {
    var aggregatequery = [
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
    console.log("err", err);
    res.send("Error" + err);
  }
});
///source search
router.get("/aggregate/source", async (req, res) => {
  try {
    let {source} = req.query

   
    var aggregatequery = [
      {
        $lookup: {
          from: "businfos",
          localField: "bus_id",
          foreignField: "_id",
          as: "busroute",
        },
      },
      {
        $group: {
          _id: "$source",
          routes: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          source: "$_id",
          routes: 1
        }
      },
      {
        $sort: {
          source: 1
        }
      }
    ];
    const detail = await busroute.aggregate(aggregatequery);
    console.log(detail)
    let matches = []
    if(source.length>0){
      matches = detail.filter(route =>{
        const regex = new RegExp(`${source}`,"gi")
        return route.source.match(regex)
      })
  
    }
    console.log("matches",matches)
    res.json(matches);
  } catch (err) {
    console.log("err", err);
    res.send("Error" + err);
  }
});
///destination search
router.get("/aggregate/destination", async (req, res) => {
  try {
    let {destination} = req.query

    var aggregatequery = [
      {
        $lookup: {
          from: "businfos",
          localField: "bus_id",
          foreignField: "_id",
          as: "busroute",
        },
      },
      {
        $group: {
          _id: "$destination",
          routes: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          destination: "$_id",
          routes: 1
        }
      },
      {
        $sort: {
          destination: 1
        }
      },
      {
        $limit: 10
      }
    ];
    
    const detail = await busroute.aggregate(aggregatequery);
    let matches = []
    if(destination.length>0){
      matches = detail.filter(route =>{
        const regex = new RegExp(`${destination}`,"gi")
        return route.destination.match(regex)
      })
  
    }
    console.log("matches",matches)
    res.json(matches);
  } catch (err) {
    console.log("err", err);
    res.send("Error" + err);
  }
});
///filter api
router.get("/aggregate/filter", async (req, res) => {
  const { source,destination,date} = req.query
  const dateParts = date.split("-");
  const reversedDateString = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  console.log("date", reversedDateString);
  try {
    var aggregatequery = [
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
    let src = detail
      .map((item) => item)
      .filter((item) => {
        const itemTimestamp = new Date(item.arrival_time)
          .toLocaleString()
          .split('/').map(str => str.padStart(2, '0')).join('-').slice(0,10);
          
        console.log("itemTimestamp", itemTimestamp);
        return (
          item.source.toLowerCase().includes(source) &&
          item.destination.toLowerCase().includes(destination) &&
          reversedDateString === itemTimestamp
        );
      });
    console.log("source", src);
    res.json(src);
  } catch (err) {
    console.log("err", err);
    res.send("Error" + err);
  }
});


/**
 *@swagger
 * /busroute/{id}:
 *   get:
 *     summary: get api for businfo by id
 *     tags: [Busroute]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/busroute'
 *
 */

router.get("/:id", async (req, res) => {
  try {
    const detail = await busroute.findById(req.params.id);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

/**
 *@swagger
 * /busroute/agi:
 *   post:
 *     summary: Lookup aggregate for businfo by match
 *     tags: [Busroute]
 *     parameters: []
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
 *                 source:
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
/**
 *@swagger
 * /busroute:
 *   post:
 *     summary:  Post api for busroute.
 *     tags: [Busroute]
 *     parameters: []
 *     requestBody: {
 *       
 *       content: {
 *     
 *          "application/json": {
 *             schema: {
 *                $ref: '#/components/schemas/busroute'
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
/**
 * @swagger
 * /busroute/updateroute/{id}:
 *   put:
 *     summary: Update bus route by ID
 *     tags: [Busroute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bus route to update
 *     requestBody:
 *      
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/busroute'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

router.put("/updateroute/:id", async (req, res) => {
  try {
    const details = await busroute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const pg = await details.save();
    res.json(pg);
  } catch (err) {
    console.log("err", err);
  }
});

/**
 *@swagger
 * /busroute/view/{id}:
 *   get:
 *     summary: get by id api
 *     tags: [Busroute]
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
 *         description: Success
 *       400:
 *         description: Error
 *
 */
router.get("/view/:id", async (req, res) => {
  try {
    const detail = await busroute.find({ bus_id: req.params.id });
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
/**
 *@swagger
 * /busroute:
 *   get:
 *     summary: get api for busroute
 *     tags: [Busroute]
 *     responses:
 *       200:
 *         description: get api for busroute
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/busroute'
 */
router.get("/", async (req, res) => {
  try {
    const detail = await busroute.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
