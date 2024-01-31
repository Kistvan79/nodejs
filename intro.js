import express from "express";
import fs from "fs";
import url from "url"

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { myDateTime } from "./myFirstModule.js";

const PORT = 3000
const WEBISTE_FOLER = 'public'
const server = express()

server.use(express.static(WEBISTE_FOLER));
server.use(express.urlencoded());


server.post("/skript", (req, res) => {
  console.log(res);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`Du skrev : ${req.body.msg_year} and ${req.body.msg_month}  `);
});

server.get('/counter', (req, res) => {

  fs.readFile('public/counter.txt', function(err, data) {
    let dataFromFile = data.toString()
    let nbr = Number(dataFromFile);
    nbr++
    fs.writeFile('public/counter.txt', nbr.toString(), function (err) {
      if (err) throw err;
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`Denna sida har laddats ${nbr} gånger`);
  })

});



server.listen(PORT, () => {
  console.log(`Server Listening to port ${PORT}`)
});