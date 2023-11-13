import express from "express";

import Pregunta from "./src/models/Pregunta.js";

import PreguntaService from "./src/services/preguntas-services.js";

import router from "./src/controllers/preguntasController.js";
import cors from "cors";

let svcPregunta = new PreguntaService();


const app = express();
const port = 5000;
app.use(express.json());

app.get("/api/preguntas/:id", async (req, res) => {
  try {
    let id = req.params.id
    let eleccion = req.query.respuesta

      let aux = await svcPregunta.getById(id);
      if (aux != null && eleccion != undefined){
        if(eleccion==aux.RespuestaCorrecta){
          res.status(200).send("true");
        }else{
          res.status(200).send("false");
        }   
      }else{
        res.status(404).send("ERROR. La pregunta no existe");
      }
      
  } catch (error) {
    res.send("error");
  }
});

app.post("/api/preguntas", async (req, res) => {
  try {
    console.log(req.body);
    let svc2 = new Pregunta();
    let preguntaNew = new svc2.constructor(
      req.body.Pregunta,
      req.body.Respuesta01,
      req.body.Respuesta02,
      req.body.Respuesta03,
      req.body.Respuesta04,
      req.body.RespuestaCorrecta,
      req.body.FechaCreacion
    );
    let Insert = await svcPregunta.insert(preguntaNew);
    res.send(Insert);
  } catch (error) {
    res.send("error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});