const express          = require('express');
const app              = express();
const ordersController = require('./controllers/ordersController');
const usersController  = require('./controllers/usersController');
const methodOverride   = require('method-override');
const bodyParser       = require('body-parser');
const session          = require('express-session');
require('./db/db');




app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.use(session({
    secret: 'This is a random secret string that you would make up to protect your session',
    resave: false, // says only save the cookie if there has been a change to one of properties
    saveUninitialized: false // only save when we have mutated the session,
    //this is what should be done for logins, many laws make you do this as well
  }))

app.use('/order', ordersController);
app.use('/user', usersController);





app.listen(3000, ()=>{
    console.log("server is running");
})