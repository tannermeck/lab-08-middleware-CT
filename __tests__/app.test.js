import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => {
    return request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Pug', dogname: 'Coco' });
  });
  it('posts a new dog into the database and retrieves a dog fact', () => {
    return request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Golden-retriever', dogname: 'Oaklee' })
      .then(response => {
        console.log(response.body);
        expect(response.body).toEqual({ id: 2, breed: 'Golden-retriever', dogname: 'Oaklee' });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
