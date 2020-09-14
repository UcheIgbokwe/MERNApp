const bcrypt = require('bcrypt-nodejs');

const HttpError = require('../models/http-error');



function salted(password, saltRounds, callback) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
               return reject(error); 
            }else{
                bcrypt.hash(password, salt, null, (error, hash) => {
                    if (error) {
                        return reject(error); 
                    }else{
                        return resolve(hash)
                    }
                });
            }
        });
    });
};

function compare(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (error, result) => {
            if (error) {
                return reject(error); 
            }else{
                return resolve(result);
            }
        });
    });
};


async function cryptPassword(password, callback){
    const saltRounds = 10;
    salted(password, saltRounds)
    .then(data => {
        callback(data);
    })
    .catch(error => {
        return new HttpError(error.message, 300);
    })
};

function comparePassword(password, hashedPassword, callback){
    compare(password, hashedPassword)
    .then(data => {
        callback(data);
    })
    .catch(error => {
        return new HttpError(error.message, 300);
    })
};

exports.cryptPassword = cryptPassword;
exports.comparePassword = comparePassword;

