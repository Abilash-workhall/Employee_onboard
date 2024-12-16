const express = require("express");
const _ = require("lodash");
const route = express.Router();

route.post("/prototype-pollution", (req, res) => {
  const input = req.body;
  const a ={};
   _.assign(a,input);
  if (a.polluted) {
    return res.status(200).send("Prototype polluted!");
  }
  res.status(400).send("No pollution detected.");
});

route.post("/code-injection", (req, res) => {
    try {
      const template = _.template(req.body.input);
      const result = template({});
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error executing template.");
    }
  });
route.post("/redos", (req, res) => {
    const input = req.body.input;
    const regex = /^(\d+)*$/; // Simplified example of an inefficient regex
    
    const start = Date.now();
    const isMatch = regex.test(input);
    const duration = Date.now() - start;
    
    res.status(200).json({ isMatch, duration });
  });
  
module.exports=route;

