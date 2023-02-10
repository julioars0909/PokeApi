const Pokemon = require("../models/pokemon.model");

exports.findPokemons = async (req, res) => {
  try {

    const {count, rows} = await Pokemon.findAndCountAll({

      attributes: ['id', 'name', 'image'],
      where: {
        status: 'available',
      },
    });

    res.status(200).json({
      status: 'success',
      count,
      results: rows,  
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
};

exports.findPokemon = async (req, res)=> {
  try {

    const {id} = req.params;

     const pokemon = await Pokemon.findOne({
      attributes: ['id', 'name', 'image'],
      where: {
        id,
        status: 'available',
      }
     });

if(!pokemon){
return res.status(404).json({
  status: 'error',
  message: 'resource not found'
})
}

    res.status(200).json({
      status: 'success',
      pokemon,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
};

exports.createPokemon = async (req, res) => {
  try {

const {name, image} = req.body;
const pokemon = await Pokemon.create({
  name: name.toLowerCase(),
  image
})

    res.status(200).json({
      status: 'success',
      message: 'pokemon created successfully', 
      pokemon,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
};

exports.updatePokemon = async (req, res) => {




  try {
    const {id} = req.params;
    const {name, image} = req.body;

    const pokemon = await Pokemon.findOne({
      where:{
        id,
        status: 'available',
      }
    });

    if(!pokemon){
      return res.status(404).json({
        status: 'error',
        message: 'resource not found'
      })
      }; 

await pokemon.update({name, image})

    res.status(200).json({
      status: 'success',
      message: 'Pokemon updated successfully'
      
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
};

exports.deletePokemon = async (req, res) => {
  try {

const {id} = req.params;

const pokemon = await Pokemon.findOne({
  where: {
    id,
    status: 'available',
  }
});

if(!pokemon){
  return res.status(404).json({
    status: 'error',
    message: 'resource not found'
  })
  };
  
  await pokemon.update({status: 'disabled'})

    res.status(200).json({
      status: 'success',
      message: 'Pokemon deleted successfully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
};