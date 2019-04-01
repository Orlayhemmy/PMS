import supertest from 'supertest';
import {
  expect
} from 'chai'
import app from '../run';

const request = supertest(app);

describe('Test for City', () => {
  const city = {
    name: 'Eko',
    male: 3227,
    female: 3435,
  };

  it('should receive a welcome message', (done) => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome');

        done();
      });
  });

  it('should fetch all states successfully', (done) => {
    request.get('/api/v1/states')
    .expect(200)
    .end((err, res) => {
      city['state_id'] = res.body.data.Lagos[0].state_id;
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('Lagos');
      expect(res.body.data.Lagos).to.have.length(1);

      done();
    });
  });

  it('should throw error when required properties are not provided', (done) => {
    request.post('/api/v1/cities')
      .expect(400)
      .end((err, res) => {
        expect(res.body.name).to.equal('Name is required');
        expect(res.body.male).to.equal('Male population is required');
        expect(res.body.female).to.equal('Female population is required');

        done();
      });
  });

  it('should throw error when male and female data contains letters', (done) => {
    request.post('/api/v1/cities')
      .send({
        name: 'Ikeja',
        male: 'rsg44',
        female: '30er'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.male).to.equal('Male population can only contain number');
        expect(res.body.female).to.equal('Female population can only contain number');

        done();
      });
  });

  it('should add a city successfully', (done) => {
    request.post('/api/v1/cities')
    .send(city)
    .expect(201)
    .end((err, res) => {
      expect(res.body).to.have.property('data');
      expect(res.body.data.name).to.equal(city.name);
      expect(res.body.data.male).to.equal(city.male);
      expect(res.body.data.female).to.equal(city.female);
      expect(res.body.message).equal('Eko added successfully');
      
      done();
    });
  });

  it('should throw an error if city already exist', (done) => {
    request.post('/api/v1/cities')
    .send(city)
    .expect(400)
    .end((err, res) => {
      expect(res.body.message).equal(`${city.name} exists already`);
    
      done();
    });
  });

  it('should fetch all cities successfully', (done) => {
    request.get('/api/v1/cities')
    .expect(200)
    .end((err, res) => {
      city['id'] = res.body.data[0].id;
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.length(1);

      done();
    });
  });

  it('should fail to update a city', (done) => {
    request.put(`/api/v1/cities/${city.id}`)
    .send({
      name: 'Maryland',
      female: '3456I7',
      male: 'e345',
    })
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('name');
      expect(res.body.name).equal('City name cannot be updated!');
      expect(res.body).to.have.property('male');
      expect(res.body.male).equal('Male population can only contain number');
      expect(res.body).to.have.property('female');
      expect(res.body.female).equal('Female population can only contain number');

      done();
    });
  });

  it('should update a city data', (done) => {
    request.put(`/api/v1/cities/${city.id}`)
    .send({
      female: 34567,
      male: 43435,
    })
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.equal('Update Successful');

      done();
    });
  });

  it('should fail to delete a state', (done) => {
    request.delete(`/api/v1/states/${city.state_id}`)
    .expect(400)
    .end((err, res) => {
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.equal('The state has sub-locations and cannot be deleted');

      done();
    });
  });

  it('should delete a city successfully', (done) => {
    request.delete(`/api/v1/cities/${city.id}`)
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.equal('Eko is deleted successfully');

      done();
    });
  });

  it('should delete a state successfully', (done) => {
    request.delete(`/api/v1/states/${city.state_id}`)
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.equal('Lagos is deleted successfully');

      done();
    });
  });
});
