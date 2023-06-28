const { MongoClient } = require('mongodb');
let mongo;

module.exports = {
  conectandoMongo: (cb) => {
    MongoClient.connect('mongodb+srv://fals:YJ2xJnh53ydrVaLx@cluster0.ijjnbqb.mongodb.net/banco2')
      .then((client) => {
        mongo = client.db();
        return cb();
      }).catch(error => {
        console.log(error);
        return cb(error);
      });
  },
  getMongo: () => mongo
};