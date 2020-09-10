

async function getCordinates(address) {

    const location = await { lat: 40.7484474, lng: -739871516 }
    return location;
};

function getCordinatess(address) {

    const location =  { lat: 40.7484474, lng: -739871516 }
    return location;
};


exports.getCordinates = getCordinates;
exports.getCordinatess = getCordinatess;