const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');
const getCordinates = require('../util/location');

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pId;
    if (placeId) {
        const place = DUMMY_PLACES.find(p => {
            return p.id === placeId;
        });
        if (place) {
            return res.json({place})
        }
        return next(new HttpError("User Id doesn't exist", 404));
        
    }
    throw new HttpError("Id is null", 404);
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    if (userId) {
        const places = DUMMY_PLACES.filter(u => {
            return u.creator === userId;
        });
        if (places || places.length > 0) {
            return res.json({places})
        }
        next(new HttpError("Places doesn't exist", 404));
    }
};

const createPlace = async(req, res, next) => {
    //when you use an async , always wrap your throw in a next function and wrap your imported async function in a try catch.
    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCordinates(address);
    } catch (error) {
        return next(error)
    }

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace); //unshift(createdplace) if i want it added to the front of list
    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (placeId) {
        const { title, description } = req.body;
        const updatedPlace = { ...DUMMY_PLACES.find(u => u.id === placeId) }
        const updateIndex = DUMMY_PLACES.findIndex(u => u.id === placeId);

        updatedPlace.title = title ? title : " ";
        updatedPlace.description = description ? description : " ";

        DUMMY_PLACES[updateIndex] = updatedPlace;

        return res.status(200).json({updatedPlace});
    }
    throw new HttpError("Id is null", 404);
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (placeId) {
        const DUMMY_PLACES = DUMMY_PLACES.filter(u => u.id !== placeId);
        return res.status(200).json({ message: 'Deleted place'})
    }
    throw new HttpError("Id is null", 404);
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;