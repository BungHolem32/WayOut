const app = require('../server');
const mocha = require('mocha');
const describe = mocha.describe;
const chai = require('chai');
const request = require('supertest');


//todo fix issue with the connection refused
const expect = chai.expect;
describe('Network Crud', () => {
    describe('GET all networks', () => {
        it('Should get all networks', (done) => {
            request(app)
                .get('api/network')
                .expect('Content-Type','json')
                .expect(200)
                .end((err,res)=> {
                    if (err) {
                        return done(err);

                    }
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();

                })
        });
        it('Should get Specific record', (done) => {
            request(app)
                .get('api/network/5104e127-fe86-4ed5-b65d-a9c0132c3dfb')
                .expect('Content-Type','json')
                .expect(200)
                .end((err,res)=> {
                    if (err) {
                        return done(err);

                    }
                    expect(res.body).to.be.an('object');
                    done();
                })
        })
    });
});

