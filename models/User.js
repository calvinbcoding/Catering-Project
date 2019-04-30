const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required: true},
    caterer: {
        type: String,
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;