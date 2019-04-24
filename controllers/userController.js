const express = require('express');
const router  = express.Router();
const User  = require('../models/User');
const Order = require('../models/Order');



//user index route
router.get('/', (req, res) => {

    // show all of the resource
    User.find({}, (err, foundUser) => {
      if(err){
        res.send(err)
      } else {
        res.render('user/index.ejs', {
          user: foundUser
        })
      }
    });
  });
  


  //User new route 
  router.get('/new', async (req, res)=>{
    try {
       
      const allUsers = await User.find({});
 
 
     res.render('user/new.ejs', {
         user: allUsers
       });
 
   } catch (err) {
 
       res.send(err);
   }
 });

//user show
  router.get('/:id', async (req, res) => {

    try {
        const foundUser = await User.findById(req.params.id);
        res.render('/user/show.ejs', {
            user: foundUser
        });

    } catch (err) {
        res.send(err)
    }
   
});



module.exports = router;
