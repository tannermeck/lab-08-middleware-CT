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
  static async getDog(id){
    const dog = await Dogs.getById(id);
    return dog;
  }
  static async updateDog(id, { breed, dogname, fact }){
    const dog = await Dogs.update(id, { breed, dogname, fact });
    return dog;
  }
  static async deleteDog(id){
    const dog = await Dogs.deleteById(id);
    return dog;
  }
}
