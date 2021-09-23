// import getDogFact from '../utils/dogAPI.js';
import Dogs from '../models/Dogs.js';


export default class FactService { 
  static async createDog({ breed, dogname }) {
    // const dogFact = await getDogFact();
    const addDog = await Dogs.insert({ breed, dogname });
    return addDog;
  }
}
