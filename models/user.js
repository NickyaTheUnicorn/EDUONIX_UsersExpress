/**
 * User.js mdoel defines the user schema for Mongo DB
 * Author: Renner Yannick
 * Created On: 02.17.2021
 */
const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', function encryptPassword(next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if(hashErr) return next(hashErr);
            user.password = hash;
            next(); 
        });
    });
});

module.exports = mongoose.model('User', userSchema);