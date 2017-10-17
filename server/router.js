const router = require("express").Router();
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookCtrl = require('./FacebookCtrl');

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });
passport.use(new FacebookStrategy(config.fb, FacebookCtrl.authenticate));

router.get("/auth/fb", (req, res) => {
  passport.authenticate('facebook', { scope : 'email' })
});

module.exports = router;

// router.get('/auth/fb/callback', passport.authenticate('facebook'), (req, res) => {
//   res.status(200).send(false);
// });

// router.get('/logout', (req, res) => {
//   req.logout(); res.status(200).send(true);
// });

//https://www.youtube.com/watch?v=pSSF1oZAA5I