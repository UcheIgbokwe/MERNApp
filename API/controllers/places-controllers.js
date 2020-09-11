const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');
const cordinate = require('../util/location');
const place = require('../models/place');


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pId;

    try {
        let aPlace;
        if (placeId) {
            aPlace = place.findOne({where:{Id:placeId}})
            .then(aPlace => {
                if (!aPlace) {
                    return next(new HttpError("Place doesn't exist.", 404));
                }
                return res.status(200).json({aPlace})
            })
            .catch(error => {
                return next(new HttpError(error.message, 300));
            })
        }else{
            return next(new HttpError("Id is null.", 404));
        }
            
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
    
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    try {
        let aPlace;
        if (userId) {
            aPlace = place.findAll({where:{Creator:userId},raw: true})
            .then(aPlace => {
                if (!aPlace) {
                    return next(new HttpError("Place doesn't exist.", 404));
                }
                return res.status(200).json({aPlace})
            })
            .catch(error => {
                return next(new HttpError(error.message, 300));
            })
        }else{
            return next(new HttpError("UserId is null.", 404));
        }
            
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
};

const createPlace = async(req, res, next) => {
    //when you use an async , always wrap your throw in a next function and wrap your imported async function in a try catch.
    const { title, description, imageUrl, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await cordinate.getCordinates(address);
    } catch (error) {
        return next(error)
    }

    try {
        place.create({Title: title, Description: description, ImageUrl: imageUrl, Location: coordinates, Address: address, Creator: creator})
            .then(data => {
                return res.status(201).json({Result: data})
            })
            .catch(error => {
                return next(new HttpError(error.message, 300));
            })
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }
    
};

const updatePlace = (req, res, next) => {
    const placeId = req.params.pId;

    try {
        let aPlace;
        if (placeId) {
            aPlace = place.findOne({where:{Id:placeId}})
            .then(aPlace => {
                if (!aPlace) {
                    return next(new HttpError("Place doesn't exist.", 404));
                }else{
                    let coordinates;
                    const address = req.body.address ? req.body.address : aPlace.Address;
                    try {
                        coordinates = cordinate.getCordinatess(address);
                    } catch (error) {
                        return next(error)
                    }

                    const query = {
                        Title: req.body.title ? req.body.title : aPlace.Title,
                        Description: req.body.description ? req.body.description : aPlace.Description,
                        ImageUrl: req.body.imageUrl ? req.body.imageUrl : aPlace.ImageUrl,
                        Location: coordinates,
                        Address: address,
                        Creator: req.body.creator ? req.body.creator : aPlace.Creator
                    };

                    place.update(query,{where:{Id:placeId}})
                    .then(newPlace => {
                        return res.status(200).json({query})
                    })
                    .catch(error => {
                        return next(new HttpError(error.message, 300));
                    })

                }
            })
            .catch(error => {
                return next(new HttpError(error.message, 300));
            })
        }else{
            return next(new HttpError("Id is null.", 404));
        }
            
    } catch (error) {
        return next(new HttpError(error.message, 300));
    }

};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pId;

    if (placeId) {
        place.destroy({where:{Id:placeId}})
        return res.status(200).json({ message: 'Deleted place'})
    }
    throw new HttpError("Id is null", 404);
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
