const express          = require('express');
const app              = express();

const methodOverride   = require('method-override');
const bodyParser       = require('body-parser');
const session          = require('express-session');
const morgan = require('morgan');
require('./db/db');

const orderController = require('./controllers/orderController');
const userController  = require('./controllers/userController');
const logInController = require('./controllers/logInController')

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'))


app.use(session({
    secret: 'This is a random secret string that you would make up to protect your session',
    resave: false, // says only save the cookie if there has been a change to one of properties
    saveUninitialized: false // only save when we have mutated the session,
    //this is what should be done for logins, many laws make you do this as well
  }))

//route a get request to the login page
//or /auth

app.use(morgan('short'));

app.use('/order', orderController);
app.use('/user', userController);
app.use('/auth', logInController);

app.get('/', (req , res)=>{
  res.render('index.ejs')
})


app.listen(3000, ()=>{
    console.log("server is running");
})