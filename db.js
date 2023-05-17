var { MongoClient } = require('mongodb');
var url = "mongodb://localhost:27017";

const connectToMongo = ()=>{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });
}
module.exports = connectToMongo;
