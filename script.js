// Importando modulos
const axios = require("axios")
const { v4: uuidv4 } = require("uuid")
const chalk = require("chalk")
const http = require("http")
const _ = require("lodash")
const moment = require("moment")
// arreglo vacio de usuarios
const users = []
http
  .createServer(function (req, res) {
    if (req.url.includes("/patients")) {
      axios
        .get("https://randomuser.me/api")
        .then((patients) => {
          const name = patients.data.results[0].name.first
          const lastName = patients.data.results[0].name.last
          //const { first, last } = patients.data.results[0].name
          const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a")
          users.push({ name, lastName, id: uuidv4().slice(30), timestamp })
          _.forEach(users, (patients) =>
            console.log(
              chalk.blue.bgWhite(
                `Nombre: ${patients.name} - Apellido: ${patients.lastName} ID:${patients.id} - Timestamp: ${patients.timestamp}\n `
              )
            )
          )
          _.forEach(users, (patients) =>
            res.write(
              ` Nombre: ${patients.name} - Apellido: ${patients.lastName} ID:${patients.id} - Timestamp: ${patients.timestamp}\n`
            )
          )
          res.end()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
  .listen(8080, () => console.log("Escuchando el puerto 8080"))
