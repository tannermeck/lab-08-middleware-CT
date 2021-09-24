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
      .send({ breed: 'Pug', dogname: 'Coco', fact: 'Pugs are very friendly' });
  });
  it('posts a new dog into the database and retrieves a dog fact', async () => {
    return request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Golden-retriever', dogname: 'Oaklee' })
      .then(response => {
        expect(response.body.id).toEqual(2);
        expect(response.body.breed).toEqual('Golden-retriever');
        expect(response.body.dogname).toEqual('Oaklee');
        expect(typeof(response.body.fact)).toBe('string');
  
      });
  });
  
  it('returns all dogs when the GET / route is called', async () => {
    await request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Labrador', dogname: 'Goose' });
    return request(app)
      .get('/api/resources/dogs')
      .then(response => {
        const dogId = response.body.map(dog => dog.id);
        const dog = response.body.map(dog => dog.breed);
        const dogname = response.body.map(dog => dog.dogname);
        expect(dogId).toEqual([1, 2]);
        expect(dog).toEqual(['Pug', 'Labrador']);
        expect(dogname).toEqual(['Coco', 'Goose']);
      });
  });

  it('returns a dog by the id when GET /:id route is called', async () => {
    await request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Labrador', dogname: 'Goose' });
    return request(app)
      .get('/api/resources/dogs')
      .then(response => {
        expect(response.body).toEqual({ id: 2, breed: 'Labrador', dogname: 'Goose' })
      });
  });

  afterAll(() => {
    pool.end();
  });
});
