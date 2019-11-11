const swapi = require('swapi-node');

class SwapiController{
    
    async listSpecies(req, res){
        try{
            const {page} = req.query;
            const species = await swapi.get(`https://swapi.co/api/species/?page=${page}`);
            res.json(species);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    async listPlanets(req, res){
        try{
            const {page} = req.query;
            const planets = await swapi.get(`https://swapi.co/api/planets/?page=${page}`);
            res.json(planets);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    async getSpecie(req, res){
        try{
            const {id} = req.params;
            const specie = await swapi.get(`https://swapi.co/api/species/${id}`);
            res.json(specie);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    
    async getPlanet(req, res){
        try{   
            const {id} = req.params;
            const planet = await swapi.get(`https://swapi.co/api/planets/${id}`);
            res.json(planet);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    async getFilm(req, res){
        try{   
            const {id} = req.params;
            const film = await swapi.get(`https://swapi.co/api/films/${id}`);
            res.json(film);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    async getPerson(req, res){
        try{
            const {id} = req.params;
            const person = await swapi.get(`https://swapi.co/api/people/${id}`);
            res.json(person);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }
    }
    
    async getStarship(req, res){
        try{   
            const {id} = req.params;
            const starship = await swapi.get(`https://swapi.co/api/starships/${id}`);
            res.json(starship);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }       
    }

    async getVehicle(req, res){
        try{   
            const {id} = req.params;
            const vehicle = await swapi.get(`https://swapi.co/api/vehicles/${id}`);
            res.json(vehicle);
        } catch(err){
            console.log(err);
            res.json({error: 'can\'t connect in swapi api'});
        }       
    }
}
module.exports = new SwapiController();