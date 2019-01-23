const assert = require('assert');

exports.insertDocuments = (db, documents, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(documents, (err, result) => {
        assert.equal(err, null);
        console.log('Inserted ' + result.result.n + ' documents in collection: ' + collection);
        callback(result);
    });
};

exports.findAllDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log('Removed document: ' + document);
        callback(result);
    })
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log('Updated document with: ' + update);
        callback(result); 
    });
};
