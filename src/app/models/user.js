const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    name: {type: String, required: [true, "can't be blank"]}
});

UserSchema.methods.generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.APP_SECRET);
};

module.exports = mongoose.model('User', UserSchema);