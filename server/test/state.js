import supertest from 'supertest';
import { expect } from 'chai'
import app from '../run';

const request = supertest(app);

describe('Test for state', () => {
  const state = {
    name: 'Lagos',
    male: 3227890,
    female: 3435764
  };

  it('should add a state successfully', (done) => {
    request.post('/api/v1/states')
    .send(state)
    .expect(201)
    .end((err, res) => {
      expect(res.body).to.have.property('data');
      expect(res.body.data.name).to.equal(state.name);
      expect(res.body.data.male).to.equal(state.male);
      expect(res.body.data.female).to.equal(state.female);
      expect(res.body.message).equal('Lagos added successfully');
      
      done();
    });
  });

  it('should throw an error if state already exist', (done) => {
    request.post('/api/v1/states')
    .send(state)
    .expect(400)
    .end((err, res) => {
      expect(res.body.message).equal('Lagos state exists already');
    
      done();
    });
  });

  it('should fetch all states successfully', (done) => {
    request.get('/api/v1/states')
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('Lagos');
      expect(res.body.data.Lagos).to.have.length(1);

      done();
    });
  });
});
