const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const user = require('../models/user');


const getAllUsers = ( req, res, next ) => {

    try {
        user.findAll()
        .then(allUsers => {
            res.status(200).json({allUsers});
        })
        .catch(error => {
            return next(new HttpError(error.message, 300));
        })
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
    
    
};

const signup = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        user.create({Name: name, Email: email, Password: password})
        .then(data => {
            return res.status(201).json({ userCreated: data })
        })
        .catch(error => {
            return next(new HttpError(error.message, 300));
        })
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
    
};

const login = ( req, res, next ) => {
    const { email, password } = req.body;

    try {
        user.findOne({where:{Email:email}})
        .then(identifyUser => {
            if (identifyUser.Password === password) {
                return res.status(200).json({ message: 'Logged in '})
            }else{
                return next(new HttpError('Could not identify user.', 401))
            }
        })
        .catch(error => {
            return next(new HttpError(error.message, 300));
        })
        
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
    
};


exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;