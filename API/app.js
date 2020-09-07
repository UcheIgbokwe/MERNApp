const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./dbConnection');
const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

//The body of a request needs to be parsed first.
app.use(bodyParser.json());

app.use('/api/places', placesRouter); // => /api/places
app.use('/api/users', usersRouter)

//To handle default error when a request is not found.
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});


sequelize
    .authenticate()
    .then(() => {
        app.listen(3000);
        console.log('Connection Opor!')
    })
    .catch(err => {
        console.log(err)
    })

app.listen(5000);