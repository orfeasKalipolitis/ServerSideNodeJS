const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbOper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    
    console.log('Connected correctly to server.');

    const db = client.db(dbName);
    
    dbOper.insertDocuments(db, [{name: "honey glazed donut", description: "just a donut duuuude"}, {name:"test", description: "test"}], 'dishes', (result) => {
        console.log('Inserted doc:\n', result.ops);

        dbOper.findAllDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dbOper.updateDocument(db, {name: 'honey glazed donut'}, {description: 'a new description'}, 'dishes', (result) => {
                console.log('Updated document:\n', result.result);

                dbOper.findAllDocuments(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log(result);
                        client.close();
                    });
                });                        
            });
        });
    });
});