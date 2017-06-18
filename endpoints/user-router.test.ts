import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {router} from '../router';
import {log} from '../../logger/logger';
import * as assert from 'assert';
import {setupTests} from 'tsmongo';
import {User, userDAO} from 'tsauth';

chai.use(chaiHttp);
const expect = chai.expect;

describe('UserRouter', () => {

  setupTests.connectTestToDatabase();

  it('should be able to create user', (done) => {

    const user: User = {
      email: 'hans'
    };

    const plaintextPassword = 'Hello World';

    chai.request(router)
        .post(`/api/v1/users`)
        .send({
          user: user,
          password: plaintextPassword
        })
        .then((resp: any) => {
          expect(resp.body.data.uid).to.exist;
          done();
        }, (err) => {
          log.error(err);
          assert(false);
          done();
        })
        .catch((err) => { // TODO: do i really need catch here?
          throw err;
        });

  });

  it('should be able to fetch a user', (done) => {
    const user: User = {
      email: 'hans'
    };

    const plaintextPassword = 'Hello World';

    userDAO.create(user, plaintextPassword, (dbResp) => {
      const responseUser = dbResp.data;
      chai.request(router)
          .post(`/api/v1/login`)
          .send({
            email: responseUser.email,
            password: plaintextPassword
          })
          .then((resp: any) => {
            chai.request(router).get('/api/v1/users/' + responseUser.uid)
                .then(resp2 => {
                  expect(resp2.body.data.email).to.equal('hans');
                  done();
                }, errorResp => {
                  assert(false, 'error on getting user:' + errorResp);
                })
                .catch((err) => {
                  throw err;
                });
          }, (err) => {
            log.error(err);
            assert(false);
            done();
          })
          .catch((err) => {
            throw err;
          });
    });

  });

});
