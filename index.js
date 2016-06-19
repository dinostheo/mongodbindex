'use strict';

/**
 * @module mongodbindex
 */

const async = require('async');

/**
 * Ensure collection indices based on the given configuration.
 *
 * @param {Object} db     - Mongodb connection object.
 * @param {Array}  config - Configuration array of mongodb collections and indices.
 *
 * @return {Promise} - A promise that resolves with undefined and rejects the error.
 */
module.exports = (db, config) => {
    return new Promise((resolve, reject) => {
        async.each(config, (obj, next) => {
            obj.options = obj.options || {};

            db.collection(obj.collection).ensureIndex(obj.index, obj.options)
                .then(() => {
                    next();
                })
                .catch(next);
        }, err => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
};
