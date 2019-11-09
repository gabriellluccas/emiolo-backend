const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    name: {type: String, required: [true, "can't be blank"]},
    password_hash: {type: String, required: [true, "can't be blank"]}
});

module.exports = mongoose.model('User', UserSchema);