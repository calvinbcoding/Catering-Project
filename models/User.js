const mongoose = require("mongoose");


// here we are defining the userSchema as a new mongoose model which tracks a mongodb, this schema has
const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;