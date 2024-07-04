import * as chai from 'chai';
import axios from 'axios';
import { app } from '../app.js';

const { expect } = chai;
const PORT = process.env.PORT || 3005;
const BASE_URL = `http://localhost:${PORT}`;

let server;

describe('API Tests', () => {
  before((done) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on ${BASE_URL}`);
      done();
    });
  });

  after((done) => {
    server.close(done);
  });

  it('Debería devolver una lista de archivos procesados correctamente', async () => {
    try {
      const res = await axios.get(`${BASE_URL}/files/data`);
      expect(res.status).to.equal(200);
      expect(res.data).to.be.an('array');
    } catch (err) {
      throw new Error(err);
    }
  });
});
