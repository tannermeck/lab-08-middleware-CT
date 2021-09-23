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
  });