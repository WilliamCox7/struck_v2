var DB = require('mongodb').MongoClient;
var URL = 'mongodb://192.168.127.143:27017/struck';

module.exports = {
  authenticate: (token, refreshToken, profile, done) => {
    DB.connect(URL, (err, db) => {
      var collection = db.collection('users');
      collection.findOne({'id': profile.id}, (err, result) => {
        if (!result) {
          collection.insert(profile, (err, result) => {
            if (err) {
              return done(err, null);
            } else {
              return done(err, result);
            }
          });
        } else {
          return done(err, result);
        }
      });
    });
  }
}