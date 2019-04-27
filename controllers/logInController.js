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



// Creating what is called a hash - which is an encrypted string, based on a really
// complex mathmatical formula
// hash string
// Salt is like a key to your hash
// hash and salt get combined
// const hashedString = bcyrpt.hashSync('Your Password here', bcrypt.genSaltSync(10));
router.post('/', async (req, res) => {

console.log(req.body)
    //======== 3

    // First we must hash the password
    const password = req.body.password;
    console.log(password)
    // The password hash is what we want to put in the Database
    const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash)

    // create an object for the db entry, the properties of this object
    // will match up with our model

    const newUserRegistration = {};
    //newUserRegistration is an empty object that we use to hold the username and password from req.body form
    newUserRegistration.username = req.body.username;
    newUserRegistration.password = passwordHash;



    try {

        //

        const createdUser = await User.create(newUserRegistration);

        req.session.createdUser = createdUser._id;
        // after you create the user, this is a great time to initialize you session object
        // add properties to the session object
        req.session.logged = true;




        console.log(createdUser)

        res.redirect('/user');

    } catch (err) {
        res.send(err)
        console.log('this error is originating from the registration')
    }
});


// To compare our password and the hash we use compareSync
// bcrypt.compareSync('you plain text password', 'hashedPassword')  // return true or false

// make the form in login.ejs make a request to this
// router.post('/login', async (req, res) => {


//     // Query the database to see if the user exists
//     try {
//         const foundUser = await User.findOne({
//             'username': req.body.username
//         });

//         // Is foundUser a truthy value, if it is its the user object,
//         // if we didn't find anything then foundUser === null a falsy value
//         if (foundUser) {

//             // since the user exist compare the passwords
//             if (bcrypt.compareSync(req.body.password, foundUser.password) === true) {
//                 // set up the session 
//                 res.session.message = '';
//                 req.session.logged = true;
//                 req.session.userDbId = foundUser._id;

//                 console.log(req.session, ' successful in login')
//                 res.redirect('/user');

//             } else {
//                 // redirect them back to the login with a message
//                 req.session.message = "Username or password is incorrect";
//                 res.redirect('/login');
//             }
// //     // Query the database to see if the user exists
// //     try {
// //         const foundUser = await User.findOne({
// //             'username': req.body.username
// //         });

// //         // Is foundUser a truthy value, if it is its the user object,
// //         // if we didn't find anything then foundUser === null a falsy value
// //         if (foundUser) {

// //             // since the user exist compare the passwords
// //             if (bcrypt.compareSync(req.body.password, foundUser.password) === true) {
// //                 // set up the session
// //                 res.session.message = '';
// //                 req.session.logged = true;
// //                 req.session.usersDbId = foundUser._id;

// //                 console.log(req.session, ' successful in login')
// //                 res.redirect('/user');

// //             } else {
// //                 // redirect them back to the login with a message
// //                 req.session.message = "Username or password is incorrect";
// //                 res.redirect('/');
// //             }

// //         } else {

// //             req.session.message = 'Username or Password is incorrect';

// //             res.redirect('/');
// //         }


// //     } catch (err) {
// //         res.send(err);
// //     }





// // });


// router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.redirect('/catering/login');
//         }
//     })
// })




module.exports = router;
