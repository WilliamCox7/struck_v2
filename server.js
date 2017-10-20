const config = require('./config');

/* PACKAGES */// -- node
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const FacebookStrategy = require('passport-facebook');
const app = module.exports = express();

/* PACKAGES */// -- mongo
const mongoClient = require('mongodb').MongoClient;
const mongoURI = config.mongoURI + '/struck';

/* APP */// -- set
app.set('port', (process.env.PORT || 3000));
app.set('mongo-client', mongoClient);
app.set('url', (process.env.MONGODB_URI || mongoURI));

/* APP */// -- use
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {expires: new Date(2147483647000)}
}));
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT */// -- facebook
const FacebookCtrl = require('./server/FacebookCtrl');
passport.use('facebook', new FacebookStrategy(
  config.facebook, FacebookCtrl.authenticate
));

/* PASSPORT */// -- serialize/deserialize
passport.serializeUser((user, done) => {done(null, user);});
passport.deserializeUser((user, done) => {done(null, user);});

app.get("/auth/facebook", passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/auth/facebook' }), (req, res) => {
    res.redirect('Struck://Welcome?user=' + JSON.stringify(req.user));
});

app.get('/auth/me', function(req, res){
  console.log(req.user);
  if (req.user) {
    res.redirect('Struck://Home?user=' + JSON.stringify(req.user));
  } else {
    res.redirect('Struck://Login');
  }
});

app.get('/logout', (req, res) => {
  req.logout(); res.redirect('Struck://Login');
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
