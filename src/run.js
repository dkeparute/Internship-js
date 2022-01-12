// Express web server import
import express from "express";
const app = express();
const PORT = 3000;    // sets default website port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

const WEB = "web";
app.use(express.static(WEB, { // //default document that will be searched first
  index: ["index.html"],
})); 

app.use(express.json()); //converts to json format

// Motorbikes information import from external file
import { motorbikes, nextId } from "../web/javascript/motorbikes.js";
let newId = nextId;

// Data export in json format GET endpoint
app.get("/json/motorbikes", (req, res) => {
  res.set('Content-Type', 'application/json'); //changes content to json
  res.send(JSON.stringify(motorbikes)); //converts motorbikes object to json and sends a response
});

// Add new motorbike
app.post("/json/motorbikes", (req, res) => {
  motorbikes.push({
    id: newId++,
    brand: req.body.brand,
    model: req.body.model,
    released: req.body.released,
  });
  res.status(204).end();
});

