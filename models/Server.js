const express = require("express");
const { db } = require("../database/db");
const cors = require('cors');
const { pokemonRouter } = require("../routes/pokemon.routes");
const { request } = require("express");

class Server {


constructor(){
    this.app = express();

    this.port = process.env.PORT;

    // path Routes
this.paths = {
    pokemons: '/api/v1/pokemons'
}
    // connect to db
this.database();
    //middlewares
this.middlewares();
    //Routes
this.routes();
}

middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
}

routes(){
    this.app.use(this.paths.pokemons, pokemonRouter)
}

database(){
    db.authenticate()
    .then(()=> console.log('Database  authenticated!'))
    .catch( err => console.log(err))

    //relations

    db.sync()
    .then( ()=> console.log('Database synced!'))
    .catch(err => console.log(err))
};

listen(){
    this.app.listen(this.port,() =>{
        console.log('Server running On port', this.port)
        
    } );
}
};

module.exports = Server;