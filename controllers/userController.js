const express = require('express');
const router  = express.Router();
const User  = require('../models/User');
const Order = require('../models/Order');



//   router.get('/:id', (req, res) => {
  

//     User.findById(req.params.id)
//       .populate('order')
//       .exec((err, foundUser) => {
//         console.log(foundUser, "<----- foundAuthor in the show route")
  
//         res.render('user/show.ejs', {
//           user: foundUser
//       });
//   });
// });

//user show route
router.get('/:id', async (req, res) => {

    try {
        const foundUser = await User.findById(req.params.id);
        res.render('/user/show.ejs', {
            user: foundUser
        });

    } catch (er) {
        res.send(err)
    }
   
});


module.exports = router;
