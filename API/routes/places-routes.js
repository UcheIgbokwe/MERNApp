const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

router.get('/:pId', (req, res, next) => {
    const placeId = req.params.pId;
    if (placeId) {
        const place = DUMMY_PLACES.find(p => {
            return p.id === placeId;
        });
        if (place) {
            return res.json({place})
        }
        const error = new Error("User Id doesn't exist")
        error.code = 404;
        return next(error);
        
    }
    const error = new Error("Id is null")
    error.code = 404;
    throw error;
    
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    if (userId) {
        const user = DUMMY_PLACES.find(u => {
            return u.creator === userId;
        });
        if (user) {
            return res.json({user})
        }
        const error = new Error("Creator doesn't exist")
        error.code = 404;
        next(error);
    }
})

module.exports = router;