import pool from '../utils/pool.js';

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
    
    static async insert({ breed, dogname }, fact) {
        const { rows } = await pool.query(
          'INSERT INTO dogs (breed, dogname, fact) VALUES ($1, $2, $3) RETURNING *',
          [breed, dogname, fact]
        );
        return new Dogs(rows[0]);
    }

    static async selectAll() {
        const { rows } = await pool.query(
            'SELECT * FROM dogs',
        );
        return rows.map(row => {
          return new Dogs(row)
        });
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id = $1',
            [id]
        );
        return new Dogs(rows[0]);
    }
};
