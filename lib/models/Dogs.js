import pool from '../utils/pool.js';
import getDogFact from '../utils/dogAPI.js';

export default class Dogs {
    id;
    breed;
    dogname;
    fact;
    
    constructor(row){
      this.id = row.id;
      this.breed = row.breed;
      this.dogname = row.dogname;
      this.fact = row.fact;
    }
    
    static async insert({ breed, dogname }) {
        const fact = await getDogFact()
        const { rows } = await pool.query(
          'INSERT INTO dogs (breed, dogname, fact) VALUES ($1, $2, $3) RETURNING *',
          [breed, dogname, fact]
        );
        return new Dogs(rows[0]);
    }
};
