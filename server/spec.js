const app = require('./server');
const request = require('supertest');
const expect = require('chai').expect;
global.assert = require('assert');
require('colors');

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]'.rainbow, function() {

    it('should get all lions'.blue, function(done) {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                expect(resp.body).to.be.an('array');
                done();
            })
    });
})

describe('[TIGERS]'.rainbow, () => {
    beforeEach(() => {
        console.log('initiating tigers test..');
    });

    it('should ADD a tiger'.red, (done) => {
        request(app)
            .post('/tigers')
            .send({
                name: 'Chris',
                pride: 'Mendoza',
                age: 33,
                gender: 'Male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                let tiger = resp.body;
                expect(tiger).to.be.an('object');
                expect(tiger.name).to.be.equal('Chris');
                expect(tiger.pride).to.be.equal('Mendoza');
                expect(tiger.age).to.be.equal(33);
                expect(tiger.gender).to.be.equal('Male');
                done();
            })
    });

    it('should return ARRAY of tigers of length greater than 0'.green, (done) => {
        request(app)
            .get('/tigers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                let tigers = resp.body;
                expect(resp.body).to.be.an('array');
                expect(resp.body.length).to.be.greaterThan(0);
                done();
            })
    });

    it('should get a single tiger with id = 1'.cyan, (done) => {
        request(app)
            .get('/tigers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                let tiger = resp.body;
                expect(tiger).to.be.an('object');
                expect(tiger.name).to.be.equal('Chris');
                expect(tiger.pride).to.be.equal('Mendoza');
                expect(tiger.age).to.be.equal(33);
                expect(tiger.gender).to.be.equal('Male');
                done();
            })
    });

    it('should change the attributes of the first tiger'.yellow, (done) => {
        request(app)
            .put('/tigers/1')
            .send({
                name: 'Adrian',
                pride: 'Mui',
                age: 21
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                expect(resp.body.name).to.be.equal('Adrian');
                expect(resp.body.pride).to.be.equal('Mui');
                expect(resp.body.age).to.be.equal(21);
                done();
            })
    });
    it('should create then delete a tiger'.blue, (done) => {
        request(app)
            .post('/tigers')
            .send({
                name: 'Poop',
                pride: 'Face',
                age: 18,
                gender: 'Female'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, resp) {
                let tiger = resp.body;
                request(app)
                    .delete('/tigers/' + tiger.id)
                    .end(function(err, resp) {
                        let deleted = resp.body;
                        expect(deleted).to.be.eql(tiger);
                        done();
                    });
            });
    });


})