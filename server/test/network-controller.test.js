const app = require('../server');
const mocha = require('mocha');
const describe = mocha.describe;
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;
describe('Network Crud', () => {
    describe('GET all networks', () => {
        it('Should get all networks', (done) => {
            request(app)
                .get('api/network')
                .expect('Content-Type','json')
                .expect(200)
                .end((err,res)=>{
                    if(err)
                        return done(err);

                    done();

                })
                // .expect(res.statusCode).to.equal(200)
                // .expect(res.body).to.be.an('array');
        })
    });
});

