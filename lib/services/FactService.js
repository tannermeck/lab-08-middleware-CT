import getDogFact from '../utils/dogAPI.js';
import Dogs from '../models/Dogs.js';


export default class FactService { 
  static async createDog({ breed, dogName }) {
    const dogFact = await getDogFact();
    console.log(dogFact);
    const addDog = await Dogs.insert({ breed, dogName });
    return addDog;
  }
}
