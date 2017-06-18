"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const router_1 = require("../router");
const assert = require("assert");
const tsmongo_1 = require("tsmongo");
const tsauth_1 = require("tsauth");
chai.use(chaiHttp);
const expect = chai.expect;
describe('LoginRouter', () => {
    tsmongo_1.setupTests.connectTestToDatabase();
    it('should be able to login', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        tsauth_1.userDAO.create(user, plaintextPassword, (dbResp) => {
            expect(dbResp.error).to.be.null;
            chai.request(router_1.router)
                .post(`/api/v1/login`)
                .send({
                email: user.email,
                password: plaintextPassword
            })
                .then((resp) => {
                expect(resp.body.data.uid).to.equal(dbResp.data.uid);
                done();
            }, (err) => {
                console.error(err);
                assert(false);
                done();
            })
                .catch((err) => {
                throw err;
            });
        });
    });
    it('shouldnt be able to login with wrong password', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        tsauth_1.userDAO.create(user, plaintextPassword, (dbResp) => {
            expect(dbResp.error).to.be.null;
            chai.request(router_1.router)
                .post('/api/v1/login')
                .send({
                email: user.email,
                password: 'some wrong password'
            })
                .catch((err) => {
                expect(err.response.res.statusCode).to.equal(401);
                done();
            });
        });
    });
});
