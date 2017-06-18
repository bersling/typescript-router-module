"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Router Test', () => {
    /* not valid anymore with frontend
    it('should be json', () => {
      return chai.request(router).get('/')
          .then(res => {
            expect(res.type).to.eql('application/json');
          });
    });
  
    it('should have a message prop', () => {
      return chai.request(router).get('/')
          .then(res => {
            expect(res.body.message).to.eql('Hello World!');
          });
    });
    */
});
