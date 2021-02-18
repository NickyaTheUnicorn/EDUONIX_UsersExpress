/**
 * user.js conatins the logic of the api enpoints to manipulate the users
 * Author: Renenr Yannick
 * Created On: 02.17.2021
 */
const User = require('../models/user');

exports.user_detail = async function(req, res, next) {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch(error) {
        console.error(`An error occurred: ${error}`);
        res.status(500).send(error);
    }
};

exports.user_register = async function(req, res, next) {
    const reqBody = req.body;

    try{
        const {email} = reqBody.email;
        const user = await User.findOne({email});
        if(user) return res.status(401).json({message: 'The email address you have entered is already associated to a user'});

        const newUser =new User({...reqBody});
        const user_ = await newUser.save();

        res.status(200).send(user_);
    } catch(error) {
        console.error(`An error occurred: ${error}`);
        next(error);
    }
};