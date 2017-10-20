const HOST = {
  production: "",
  development: "http://localhost:3000"
}

const MONGO_URI = {
  production: "",
  development: "mongodb://localhost:27017"
}

const ENV = "development";

module.exports = {
    secret: '23f23h94fjkw4hf3u4hf3k',
    facebook: {
        clientSecret: 'e976a41548f7405ea39bcdf6d055703e',
        clientID: '1618764691508131',
        callbackURL: HOST[ENV] + "/auth/facebook/callback",
        profileFields: ['id', 'name', 'displayName', 'picture', 'email']
    },
    mongoURI: MONGO_URI[ENV],
    API: HOST[ENV],
}
