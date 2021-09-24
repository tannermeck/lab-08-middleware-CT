import { Router } from 'express';
import FactService from '../services/FactService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const dog = await FactService.createDog(req.body);
      res.send(dog);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const dogs = await FactService.getAllDogs();
      res.send(dogs);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const dog = await FactService.getDog(id);
      res.send(dog);
    } catch(err) {
      next(err);
    }
  });
