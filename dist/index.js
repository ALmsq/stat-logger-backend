"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _postRoutes = _interopRequireDefault(require("./routes/postRoutes"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dotenv = require('dotenv');

dotenv.config(); // import passport from './controllers/authController'
// import auth from './routes/authRoutes'
// const passport = require('./controllers/authController')
// const auth = require('./routes/authRoutes')

var passport = require('passport');

var users = require('./routes/userRoutes');

var MongoStore = (0, _connectMongo["default"])(_expressSession["default"]);
var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000; //cors setup

app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());
app.get('/', function (req, res) {
  return res.send("server running on ".concat(PORT));
});
app.listen(PORT, function () {
  console.log("server running on ".concat(PORT));
  console.log(_mongoose["default"].connection.readyState);
}); //mongoose connection

var URI = process.env.URI;
_mongoose["default"].Promise = global.Promise; // mongoose.connect('mongodb://localhost/postsDB', {

_mongoose["default"].connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}); //bodyparser setup


app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
(0, _postRoutes["default"])(app); /////////////////////////////
//session
// app.use(
//     session({
//         secret: 'super secret',
//         resave: false,
//         saveUninitialized: true,
//         store: new MongoStore({ mongooseConnection: mongoose.connection })
//     })
// )
//passport middleware

app.use(passport.initialize()); // app.use(passport.session())
//passport config

require('./config/passport')(passport); //routes


app.use('/users', users); // app.use('/api/auth/', auth)
// app.get('/api/auth/', (req, res) =>{
//     res.send('auth')
// })