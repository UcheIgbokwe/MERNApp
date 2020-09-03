const express = require('express');
const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:pId', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId)

//router.post('/', placesControllers.createPlace)
router.post('/', placesControllers.createProduct)

router.patch('/:pid', placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)

module.exports = router;