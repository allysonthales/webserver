const express = require("express");

const app = express();
app.use(express.json());

const dispositivo = {
  id: "iot0988",
  name: "Mede temperatura sala",
  unidade: "Pa",
};

const dispositivos = [];
dispositivos.push(dispositivo);

app.get("/devices", (req, res) => {
  res.json(dispositivos);
});

app.post("/devices", (req, res) => {
  const device = req.body;
  dispositivos.push(device);
  res.json(`sucesso
   ao adicionar o dispositivo de ID ${device.id}`);
});

app.get("/device", (req, res) => {
  const id = req.query.id;
  const deviceId = dispositivos.filter((device) => device.id == id);
  res.json(deviceId);
});

app.get("/", (req, res) => {
  res.send("Olá, mundo!!!");
});

app.get("/user", (req, res) => {
  res.send("Olá, usuário");
});

app.post("/", (req, res) => {
  res.send("POST");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
