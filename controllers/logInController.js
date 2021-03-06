//#####AUTHCONTROLLER########

//define and require express
const express = require('express');
//define and require router
// Use the express.Router class to create modular, mountable route handlers. 
//A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
//The following example creates a router as a module, loads a middleware
//function in it, defines some routes, and mounts the router module on a path in the main app.
const router = express.Router();

//define and require user model.  model is guided by the schema. it formats the ODM for the database
const User = require('../models/User');
//define and require bcrypt.  bcrypt is middleware that hashes and salts password string
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    //render the page with the render method on the request object
    res.render('login.ejs', {
      //inject variables - message becomes the message that is stored in the user session on the session object
      message: req.session.message
    })
  });
  
//   isCaterer === "on"
//   req.session.caterer = req.body.caterer


router.post('/register', async (req, res) => {
    if(req.body.caterer === "on"){
        req.session.caterer = true;
        console.log(req.session.caterer + "<=====req.session.caterer")
    }
console.log(req.session.user)
    //======== 3
    // First we must hash the password
    const password = req.body.password;
    console.log(password)
    // The password hash is what we want to put in the Database
    const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash)

    // create an object for the db entry, the properties of this object
    // will match up with our model
    const newUserSession = {};
    //userDbEntry is an empty object that we use to hold the username and password from req.body form
    newUserSession.username = req.body.username;
    newUserSession.password = passwordHash;
    //newUserSession.caterer = req.body.caterer

    try {

        //
        const createdUser = await User.create(newUserSession);
        req.session.userId = createdUser._id;
        // after you create the user, this is a great time to initialize you session object
        // add properties to the session object
        req.session.logged = true;
        
        console.log(createdUser)
        res.redirect('/user/'+req.session.userId);
        

    } catch (err) {
        res.send(err)
    }
});



//make the form in login.ejs make a request to this
router.post('/login', async (req, res) => {
    //this line of code needs to go at the top of each post route on the loginController above the try block
    if (req.body.caterer = "on") {
        req.session.caterer = true;
        console.log(req.session.caterer + "<=====req.session.caterer")
    }
    // Query the database to see if the user exists
    try {
        const foundUser = await User.findOne({
            'username': req.body.username,
//            'caterer': req.session.caterer
        });
    
          console.log(foundUser + "<=== found user")
          console.log(req.body + "<==== req.body")

        // Is foundUser a truthy value, if it is its the user object,
        // if we didn't find anything then foundUser === null a falsy value
        if (foundUser) {

            // since the user exist compare the passwords
            if (bcrypt.compareSync(req.body.password, foundUser.password) === true) {
                // set up the session
                req.session.logged = true;
                req.session.userId = foundUser._id;
                console.log( ' successful in login')
                res.redirect('/user');


            } else {
                // redirect them back to the login with a message
                req.session.message = "Username or password is incorrect";
                res.redirect('/auth');
            }

        } else {
            req.session.message = 'Username or Password is incorrect';
            res.redirect('/auth');
            
        }

    } catch (err) {
        res.send(err);
    }

       
console.log(foundUser)



});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        console.log(req.session)
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})




module.exports = router;
