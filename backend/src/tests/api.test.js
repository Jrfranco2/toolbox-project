import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app.js'; // Usa rutas relativas correctas con la extensión .js
const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('Debería devolver una lista de archivos procesados correctamente', (done) => {
    chai
      .request(app)
      .get('/files/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
