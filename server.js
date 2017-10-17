/* PACKAGES */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const session = require('express-session');
const config = require('./config');
const mongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb://localhost:27017/struck';
const app = module.exports = express();

/* APP */
app.set('port', (process.env.PORT || 3000));
app.set('mongo-client', mongoClient);
app.set('url', (process.env.MONGODB_URI || mongoURI));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/build'));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

passport.serializeUser((user, done) => {done(null, user);});
passport.deserializeUser((user, done) => {done(null, user);});

passport.use('facebook', new FacebookStrategy(config.facebook,
  (token, refreshToken, profile, done) => {
  mongoClient.connect(mongoURI, (err, db) => {
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
}));

app.get("/auth/facebook", passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/auth/facebook' }), (req, res) => {
    res.redirect('Struck://login?user=' + JSON.stringify(req.user));
});
app.get('/logout', (req, res) => {
  req.logout(); res.status(200).send(true);
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
