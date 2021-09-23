import Dogs from '../models/Dogs.js';
import getDogFact from '../utils/dogAPI.js';

export default class FactService { 
  static async createDog({ breed, dogname }) {
    const fact = await getDogFact();
    const addDog = await Dogs.insert({ breed, dogname }, fact);
    return addDog;
  }
  static async getAllDogs(){
    const dogs = await Dogs.selectAll();
    return dogs;
  }
}
