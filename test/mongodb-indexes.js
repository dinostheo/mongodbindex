'use strict';

const expect = require('chai').expect;
const dbIndexes = require('../');
const config = require('./test-config');

describe('Mongo DB indexes', () => {
    describe('invalid configuration', () => {
        it('should catch an async error thrown in invalid configuration', done => {
            dbIndexes({}, 'invalid type of config')
                .catch(err => {
                    expect(err).to.have.property('message').and.to.equal('Cannot assign to read only property \'options\' of i');

                    done();
                });
        });

        it('should resolve with undefined when configuration is empty array', done => {
            dbIndexes({}, [])
                .then(value => {
                    expect(value).to.be.undefined;

                    done();
                });
        });
    });

    describe('valid configuration db error', () => {
        it('should reject with a database error', (done) => {
            let db = {
                collection: () => {
                    return {
                        ensureIndex: () => {
                            return new Promise((resolve, reject) => reject('Ensure index db error.'));
                        }
                    };
                }
            };

            dbIndexes(db, config.oneIndex)
                .catch(err => {
                    expect(err).to.equal('Ensure index db error.');

                    done();
                });
        });
    });

    describe('valid configuration', () => {
        before(() => {
            this.db = {
                collection: () => {
                    return {
                        ensureIndex: () => {
                            return new Promise(resolve => resolve());
                        }
                    };
                }
            };
        });

        it('should resolve with undefined value', done => {
            dbIndexes(this.db, config.oneIndex)
                .then(value => {
                    expect(value).to.be.undefined;

                    done();
                });
        });

        it('should resolve with undefined value', done => {
            dbIndexes(this.db, config.manyIndices)
                .then(value => {
                    expect(value).to.be.undefined;

                    done();
                });
        });
    });
});
