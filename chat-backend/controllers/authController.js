const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/app');

exports.login = async (req, res) => {
    const {email, password} = req.body
    const secret = require('crypto').randomBytes(64).toString('hex');
    
    try {
        // Find the User
        const user = await User.findOne({
            where: {
                email
            }
        })

        // Check is user was found
        if (!user) return res.status(404).json({message: 'User not found!'})
        // Chack password matches
        if(!bcrypt.compareSync(password, user.password)) return res.status(404).json({message: 'Incorrect password'})     
        // Generates auth Token for this user
        const userWithToken = generateToken(user.get({raw: true}))
        userWithToken.user.avatar = user.avatar;
        
        return res.send(userWithToken)

    } catch (e) {
         return res.status(500).json({message: e.message});
    }

  return res.send([email, password]);
}

exports.register = async (req, res) => {
    
    try {
        // Create new user on register
        const user = await User.create(req.body)
        // Generates auth Token for this user
        const userWithToken = generateToken(user.get({raw: true}))
        return res.send(userWithToken)
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

const generateToken = (user) => {
    
    delete user.password;

    const token = jwt.sign(user, config.appKey, {expiresIn: 86400});
    return {...{ user }, ...{token}}
}