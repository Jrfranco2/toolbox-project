import * as chai from 'chai';
import axios from 'axios';
import { app } from '../app.js';
import nock from 'nock';

const { expect } = chai;
const PORT = process.env.PORT || 3005;
const BASE_URL = `http://localhost:${PORT}`;
const EXTERNAL_API_BASE_URL = 'https://echo-serv.tbxnet.com';

let server;

describe('API Tests', () => {
  describe('/files/lists', () => {
    before((done) => {
      server = app.listen(PORT, () => {
        console.log(`Test server running on ${BASE_URL}`);
        done();
      });
    });

    after((done) => {
      server.close(done);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('Should return the list of available files', async () => {
      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/files')
        .reply(200, {
          files: [
            'test1.csv',
            'test2.csv',
            'test3.csv',
            'test5.csv',
            'test6.csv',
          ],
        });

      try {
        const res = await axios.get(`${BASE_URL}/files/list`);
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('object');
        expect(res.data).to.have.property('files').that.is.an('array');
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should return 500 if fetching the list of files fails', async () => {
      nock(EXTERNAL_API_BASE_URL).get('/v1/secret/files').reply(500);

      try {
        await axios.get(`${BASE_URL}/files/list`);
        throw new Error('Expected request to fail');
      } catch (err) {
        if (err.response) {
          expect(err.response.status).to.equal(500);
          expect(err.response.data)
            .to.have.property('error')
            .that.is.a('string');
        } else {
          throw new Error(
            'Expected an error response but got a different error'
          );
        }
      }
    });
  });
});
