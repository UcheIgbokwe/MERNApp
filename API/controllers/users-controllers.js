const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Uche Igbokwe',
        email: 'test@test.com',
        password: 'testers'
    },
    {
        id: 'u2',
        name: 'Imoh Odoro',
        email: 'test@test.com',
        password: 'testers'
    }
];

const getAllUsers = ( req, res, next ) => {
    res.status(200).json({allUsers: DUMMY_USERS });
};

const signup = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const newUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(newUser);

    return res.status(201).json({ userCreated: newUser })
};

const login = ( req, res, next ) => {
    const { email, password } = req.body;
    const identifyUser = DUMMY_USERS.find(u => u.email === email);

    if (identifyUser && identifyUser.password === password) {
        return res.status(200).json({ message: 'Logged in '})
    }
    throw new HttpError('Could not identify user.', 401)
};


exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;