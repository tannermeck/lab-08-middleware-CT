import pool from '../utils/pool.js';

export default class Dogs {
    id;
    breed;
    dogname;
    
    constructor(row){
      this.id = row.id;
      this.breed = row.breed;
      this.dogname = row.dogname;
    }

    static async insert({ breed, dogname }) {
        const { rows } = await pool.query(
          'INSERT INTO dogs (breed, dogname) VALUES ($1, $2) RETURNING *',
          [breed, dogname]
        );
        return new Dogs(rows[0]);
    }
};
