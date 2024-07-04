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
  before((done) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on ${BASE_URL}`);
      done();
    });
  });

  after((done) => {
    server.close(done);
  });

  describe('/files/data', () => {
    beforeEach(() => {
      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/files')
        .reply(200, {
          files: ['test1.csv', 'test2.csv', 'test3.csv', 'test6.csv'],
        });

      nock(EXTERNAL_API_BASE_URL).get('/v1/secret/file/test1.csv').reply(500);

      nock(EXTERNAL_API_BASE_URL).get('/v1/secret/file/test2.csv').reply(404);

      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/file/test3.csv')
        .reply(
          200,
          `file,text,number,hex
          test3.csv,c,24,
          test3.csv,hHghgqInprdtBasFyIuChp,3371,912b55526073915c3f26290ceab0924e
          test3.csv,dHAoz,81611524,1d1f4193768fc280186dd26e19da87cb
          test3.csv,eToqKkUgLVkOzYW,05431,5b5811bb3f603ff17ee0772f2ea1a63f
        `
        );

      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/file/test6.csv')
        .reply(
          200,
          `file,text,number,hex
          test6.csv,IfXbV
          test6.csv,odNjA,5034236o,b28d6b82887e184b246417ade63d9da7
          test6.csv,zCPCqPlYVnyJvyYA,33832o,7b19de80d013200e3fb53e5fb6a74f33
          test6.csv,tBfYhUhYxpnGnWvHDpIj,33974o,7103c4ac2f7860600b74c6ea28319064
          test6.csv,nGbJBQgRLSmFmDjnt,5597o,d510a4e62c32e38060cbca9a4a92e65a
          test6.csv,eiZwzFZQzYoVcZPocJxWCRiFCOO,35449579667183099296436141872182o,354d43507ef3592426bb8ff0d4d9cfba
          test6.csv,ucrunOgXFZxFDprf,2o,655b85c75924ebd2d7589b6b8a7f92a4
          test6.csv,nTLDaj,33189o,ee40fbdd39c9314a107ba219e5617645
          test6.csv,jKyDmQQFSgrEKteyKPqYiukO,119o,d28559b696b98ebe2fa44d8d45bad735,,
          test6.csv,E,319
          test6.csv,hHrSXJXEHsAkxQvPcz,899o,ece8395f021dd80d0999174f960c3b87
          test6.csv,szgRwj,12634900512360138356600871830943o,0f38e062f857f1a385f43b2e3007598f
        `
        );
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('Should return a success list', async () => {
      try {
        const res = await axios.get(`${BASE_URL}/files/data`);
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should return lines with an empty array when the file is corrupted and external api response status is 500', async () => {
      try {
        const res = await axios.get(`${BASE_URL}/files/data`);

        const fileData = res.data.filter((file) => file.file === 'test1.csv');

        expect(fileData[0]).to.have.a.property('lines');
        expect(fileData[0].lines).to.be.empty;
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should return lines with an empty array when the file is corrupted and external api response status is 404', async () => {
      try {
        const res = await axios.get(`${BASE_URL}/files/data`);

        const fileData = res.data.filter((file) => file.file === 'test2.csv');

        expect(fileData[0]).to.have.a.property('lines');
        expect(fileData[0].lines).to.be.empty;
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should remove the line when the line of the file is incomplete', async () => {
      try {
        const res = await axios.get(`${BASE_URL}/files/data`);

        const fileData = res.data.filter((file) => file.file === 'test3.csv');

        expect(fileData[0]).to.have.a.property('lines');
        expect(fileData[0].lines).to.have.lengthOf(3);
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should remove the line when the line of the file has more columns', async () => {
      try {
        const res = await axios.get(`${BASE_URL}/files/data`);

        const fileData = res.data.filter((file) => file.file === 'test6.csv');

        expect(fileData[0]).to.have.a.property('lines');
        expect(fileData[0].lines).to.have.lengthOf(9);
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should return 500 when something when wrong', async () => {
      nock.cleanAll();

      nock(EXTERNAL_API_BASE_URL).get('/v1/secret/files').reply(500);

      try {
        await axios.get(`${BASE_URL}/files/data`);
        throw new Error('Expected request to fail');
      } catch (err) {
        expect(err.response.status).to.equal(500);
        expect(err.response.data).to.have.property('error').that.is.a('string');
      }
    });
  });

  describe('/files/data with fileName query parameter', () => {
    beforeEach(() => {
      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/files')
        .reply(200, {
          files: ['testQuery.csv'],
        });
      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/file/testQuery.csv')
        .reply(
          200,
          `file,text,number,hex
            testQuery.csv,nTLDaj,33189o,ee40fbdd39c9314a107ba219e5617645
          `
        );
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it("Should return a specific file's data with status 200", async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/files/data?fileName=testQuery.csv`
        );
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('object');
        expect(res.data).to.have.property('file', 'testQuery.csv');
        expect(res.data).to.have.property('lines').that.is.an('array');
      } catch (err) {
        throw new Error(err);
      }
    });

    it('Should return 404 when file is not found', async () => {
      nock(EXTERNAL_API_BASE_URL)
        .get('/v1/secret/file/nonexistent.csv')
        .reply(404);

      try {
        await axios.get(`${BASE_URL}/files/data?fileName=nonexistent.csv`);
        throw new Error('Expected request to fail');
      } catch (err) {
        if (err.response) {
          expect(err.response.status).to.equal(404);
          expect(err.response.data)
            .to.have.property('message')
            .that.is.a('string')
            .and.equal('Filename: nonexistent.csv not found');
        } else {
          throw new Error(
            'Expected an error response but got a different error'
          );
        }
      }
    });

    it('Should return 500 when fetching the file data fails', async () => {
      nock(EXTERNAL_API_BASE_URL).get('/v1/secret/file/test500.csv').reply(500);

      try {
        await axios.get(`${BASE_URL}/files/data?fileName=test500.csv`);
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
