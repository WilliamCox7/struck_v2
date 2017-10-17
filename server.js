/* PACKAGES */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const session = require('express-session');
const config = require('./config');
const mongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb://192.168.127.143:27017/struck';
const DB = require('mongodb').MongoClient;
const app = module.exports = express();
const router = require('./server/router');

/* APP */
app.set('port', (process.env.PORT || 3000));
app.set('mongo', mongoClient);
app.set('url', (process.env.MONGODB_URI || mongoURI));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/build'));
// app.use("/auth/fb", router);
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

const castProfile = (profile) => {

}

passport.use(new FacebookStrategy(config.fb, 
  async(accessToken, refreshToken, profile, done) => {
    DB.connect(mongoURI, (err, db) => {
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
}))

app.get("/auth/fb", passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/fb/callback', passport.authenticate('facebook', { 
  failureRedirect: '/auth/facebook' }), (req, res) => {
    res.redirect('Struck://login?user=' + JSON.stringify(req.user));
});
app.get('/logout', (req, res) => {
  req.logout(); res.status(200).send(true);
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
