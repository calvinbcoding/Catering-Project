const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;