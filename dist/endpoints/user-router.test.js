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
describe('UserRouter', () => {
    tsmongo_1.setupTests.connectTestToDatabase();
    it('should be able to create user', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        chai.request(router_1.router)
            .post(`/api/v1/users`)
            .send({
            user: user,
            password: plaintextPassword
        })
            .then((resp) => {
            expect(resp.body.data.uid).to.exist;
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
    it('should be able to fetch a user', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        tsauth_1.userDAO.create(user, plaintextPassword, (dbResp) => {
            console.log('created hans');
            const responseUser = dbResp.data;
            chai.request(router_1.router)
                .post(`/api/v1/login`)
                .send({
                email: responseUser.email,
                password: plaintextPassword
            })
                .then((resp) => {
                console.log('returned');
                chai.request(router_1.router).get('/api/v1/users/' + responseUser.uid)
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
                console.error(err);
                assert(false);
                done();
            })
                .catch((err) => {
                throw err;
            });
        });
    });
});
