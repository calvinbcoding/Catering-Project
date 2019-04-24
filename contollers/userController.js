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





module.exports = router;
