const assert = require('assert');

exports.insertDocuments = (db, documents, collection) => 
    db.collection(collection).insert(documents);

exports.findAllDocuments = (db, collection) => 
    db.collection(collection).find({}).toArray();


exports.removeDocument = (db, document, collection) =>
    coll = db.collection(collection).deleteOne(document);

exports.updateDocument = (db, document, update, collection) =>
    db.collection(collection).updateOne(document, { $set: update }, null);
