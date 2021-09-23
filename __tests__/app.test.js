import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import getDogFact from '../lib/utils/dogAPI.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => {
    return request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Pug', dogname: 'Coco', fact: 'Pugs are very friendly' });
  });
  it('posts a new dog into the database and retrieves a dog fact', async () => {
    const fact = await getDogFact();
    return request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Golden-retriever', dogname: 'Oaklee', fact })
      .then(response => {
        expect(response.body.id).toEqual(2);
        expect(response.body.breed).toEqual('Golden-retriever');
        expect(response.body.dogname).toEqual('Oaklee');
        expect(typeof(response.body.fact)).toBe('string');
  
      });
  });

  afterAll(() => {
    pool.end();
  });
});
