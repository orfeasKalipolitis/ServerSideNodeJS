const MongoClient = require('mongodb').MongoClient;

const dbOper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

MongoClient.connect(url)
    .then((client) => {
        console.log('Connected correctly to server.');

        const db = client.db(dbName);

        dbOper.insertDocuments(db, [{name: "honey glazed donut", description: "just a donut duuuude"}, {name:"test", description: "test"}], 'dishes')
        .then((result) => {
            console.log('Inserted doc:\n', result.ops);

            return dbOper.findAllDocuments(db, 'dishes');
        }).then((docs) => {
            console.log('Found Documents:\n', docs);

            return dbOper.updateDocument(db, {name: 'honey glazed donut'}, {description: 'a new description'}, 'dishes');
        }).then((result) => {
                console.log('Updated document:\n', result.result);

                return dbOper.findAllDocuments(db, 'dishes');
        }).then((docs) => {
            console.log('Found Documents:\n', docs);

            return db.dropCollection('dishes');
        }).then((result) => {
            console.log(result);
            client.close();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));