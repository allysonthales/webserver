const express = require("express");

const app = express();
app.use(express.json());


let dispositivos = {};

app.get("/devices", (req, res) => {
    const values = Object.values(dispositivos)

  res.json(values);
});

function isValid(device) {
  const existsId = device.id != undefined
  const existsName = device.name != undefined
  const existsUnidade = device.unidade != undefined

  return existsId && existsName && existsUnidade
}

app.post("/devices", (req, res) => {
  const device = req.body;

  if(!isValid(device)){
    res.status(400).json({'msg':'Dispositivo inválido!!'})
    return
  }

  if(dispositivos[device.id] == undefined) {

      dispositivos[device.id] = device
      res.json(`sucesso
       ao adicionar o dispositivo de ID ${device.id}`);
  }else {
      res.json({'msg': 'Já existe em dispositivo cadastrado no id ' + device.id})
  }
});

app.get("/device", (req, res) => {
  const id = req.query.id;
  const deviceId = dispositivos[id]

  if (id == undefined) {
    res.status(404).json({"msg":"É necessario indicar o ID que deseja buscar"})
    return
  }
  if(deviceId == undefined){
    res.status(404).json({"msg":"Não existe dispositivo cadastrado no id indicado"})
    return
  }
  res.json(deviceId);
});

app.delete('/device', (req, res)=>{
    const id = req.query.id
    if(id == undefined){
      res.json({'msg':'É necessário indicar um id que deseja buscar'})
      return
    }
    if (dispositivos[id] == undefined){
      res.json({'msg':'Não existe dispositivo cadastrado no ID indicado'})
      return
    }
    delete dispositivos[id]
    res.json({'msg': 'dispositivo removido com sucesso'})
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.put('/devices', (req, res) => {
  const device = req.body
  if(dispositivos[device] == undefined){
    res.json({'msg':'Não existe um dispositico cadastrado no ID'})
    return
  }
  if(device == undefined) {
    res.json({'msg':'É necessário indicar um id que deseja inserir'})
    return
  }
  dispositivos[device.id] = device
  res.json({'msg':'Dispositivo atualizado com sucesso'})
})
