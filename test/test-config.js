/**
 * @module test/test-config
 */

module.exports = {
    oneIndex: [
        {
            collection: 'collectionName',
            index: { field: 1 },
            options: { expireAfterSeconds: 3600, background: true }
        }
    ],

    manyIndices: [
        {
            collection: 'collectionNameOne',
            index: { field: 1 },
            options: { expireAfterSeconds: 3600, background: true }
        },
        {
            collection: 'collectionNameOne',
            index: { field: 1 },
            options: { expireAfterSeconds: 3600, background: true }
        }
    ]
};
