const mongoClient = require('mongodb').MongoClient;

const state = {
  db: null,
};
module.exports.connect = function(done) {
  // url
  const url = process.env.MONGO_URL;
  // database name
  const dbname = 'marlo';

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};
module.exports.get = function() {
  return state.db;
};
