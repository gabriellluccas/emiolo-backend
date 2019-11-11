const swapi = require('swapi-node');

class SwapiController{
    
    async listSpecies(req, res){
        try{
            const {page} = req.query;
            const species = await swapi.get(`https://swapi.co/api/species/?page=${page}`);
            res.json(species);
        } catch(err){
            console.log(err);
        }
    }

    listPlanets(req, res){
        swapi.getPlanets();
    }

}
module.exports = new SwapiController();