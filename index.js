const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  fs.writeFileSync("repertorios.json", JSON.stringify([...canciones, cancion]));
  res.send("cancion agregada");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));

  const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
  canciones[index] = cancion;
  fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
  res.send("cancion actualizada");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));

  const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
  canciones.splice(index, 1);
  fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
  res.send("cancion eliminada");
});

app.listen(3000, console.log("encendido"));
