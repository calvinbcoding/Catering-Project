const express          = require('express');
const app              = express();

const methodOverride   = require('method-override');
const bodyParser       = require('body-parser');
const session          = require('express-session');
const morgan           = require('morgan');
//const MongoDBStore     = require('connect-mongodb-session')(session);
//const bcrypt           = require('bcryptjs');
require('./db/db');

const orderController = require('./controllers/orderController');
const userController  = require('./controllers/userController');
const logInController = require('./controllers/logInController')

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'))
// const store = new MongoDBStore({
//   uri: 'mongodb://localhost/catering',
//   collection: 'users'
// });
// app.use(cookie-session)

app.use(session({
    secret: 'This is a random secret string that you would make up to protect your session',
    resave: true, // says only save the cookie if there has been a change to one of properties
    saveUninitialized: true // only save when we have mutated the session,
    //this is what should be done for logins, many laws make you do this as well
  }))

//route a get request to the login page
//or /auth
app.get('/', (req, res) => {
  //render the page with the render method on the request object
  res.render('login.ejs', {
    //inject variables - message becomes the message that is stored in the user session on the session object
    message: req.session.message
  })
});

app.use(morgan('short'));

app.use('/order', orderController);
app.use('/user', userController);
app.use('/auth', logInController);




app.listen(3000, ()=>{
    console.log("server is running");
})