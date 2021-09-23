import pool from '../utils/pool.js';

export default class Dogs {
    id;
    breed;
    dogName;
    
    constructor(row){
      this.id = row.id;
      this.breed = row.breed;
      this.dogName = row.dogName;
    }

    static async insert({ breed, dogName }) {
        const { rows } = await pool.query(
          'INSERT INTO dogs (breed, dogName) VALUES ($1, $2) RETURNING *',
          [breed, dogName]
        );
        return new Dog(rows[0]);
    }
};
