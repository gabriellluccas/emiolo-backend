const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    name: {type: String, required: [true, "can't be blank"]},
    password_hash: {type: String}
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password_hash')) {
        user.password_hash = await bcrypt.hash(user.password_hash, 8);
    }
    next();
});

UserSchema.methods.generatePasswordHash = (user) => {
    return jwt.sign({ id: user.id }, process.env.APP_SECRET);
};

module.exports = mongoose.model('User', UserSchema);