//configuracion de las variables de entorno 
require('dotenv').config()

//instanciamos nuestra clase
const Server = require('./models/Server')

const server = new Server();

//Ponemos a escuchar nuestro server
server.listen()