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
      .get('/api/resources/dogs/2')
      .then(response => {
        expect(response.body.id).toEqual(2);
        expect(response.body.breed).toEqual('Labrador');
        expect(response.body.dogname).toEqual('Goose');
      });
  });

  it('updates a dog based on the id that the PUT /:id route is called to', async () => {
    await request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Labrador', dogname: 'goose', fact: 'goose loves treats' });
    return request(app)
      .put('/api/resources/dogs/2')
      .send({ id: 2, breed: 'Labrador-Retriever', dogname: 'Goose', fact: 'goose loves treats' })
      .then(response => {
        expect(response.body.id).toEqual(2);
        expect(response.body.breed).toEqual('Labrador-Retriever');
        expect(response.body.dogname).toEqual('Goose');
      });
  });

  it('deletes a dog based on the id that the DELETE /:id route is called to', async () => {
    await request(app)
      .post('/api/resources/dogs')
      .send({ breed: 'Labrador', dogname: 'goose', fact: 'goose loves treats' });
    return request(app)
      .delete('/api/resources/dogs/1')
      .then(response => {
        expect(response.body).toEqual({ breed: 'Pug', dogname: 'Coco', fact: 'Pugs are very friendly' });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
