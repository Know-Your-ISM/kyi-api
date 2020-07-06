const Location = require ("../models/Location");

exports.fetchAll = async (req, res) => {
    try {
        let _queryTime = Date.now();
        let locs = await Location.find({}, null, {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });
        _queryTime = Date.now() - _queryTime;
        res.json({ count: locs.length, locations: locs, _queryTime });
    } catch (e) {
        console.log("fetchCollegeLoc:", e);
        res.status(500).json({ "error": e });
    }
}

exports.createLoc = async (req, res) => {
    let { 
        name, latitude, longitude, 
        big, medium, small, 
        thumb, rickshaw, spending, 
        rating, description, propertyType, plusID } = req.body;
    try {
        let loc = new Location ({
            name: name,
            propertyType: propertyType || "Institute Owned",
            photo: {
                big: big || "",
                medium: medium || "",
                small: small || "",
                thumb: thumb || ""
            },
            costs: {
                rickshaw: rickshaw || "0",
                spending: spending || "0"
            },
            rating: rating || "0",
            coordinates: {
                latitude: latitude || "",
                longitude: longitude || "",
                plusID: plusID || ""
            },
            description: description || ""
        });

        let savedLoc = await loc.save();

        res.json({ info: "Location saved.", location: savedLoc });
    } catch (e) {
        console.log("createLoc", e);
        res.json({ "error": e });
    }
}

exports.searchLoc = async (req, res) => {
    let regex = new RegExp (req.params.query);
    var fields = { 
        $or: [ 
            { name: { $regex: regex, $options: "i" } },
            { "propertyType": { $regex: regex, $options: "i" } },
            { "description": { $regex: regex, $options: "i" } },
            { "coordinates.longitude": { $regex: regex, $options: "i" } },
            { "coordinates.latitude": { $regex: regex, $options: "i" } }, 
            { "coordinates.plusID": { $regex: regex, $options: "i" } }, 
            { "costs.rickshaw": { $regex: regex, $options: "i" } },
            { "costs.spending": { $regex: regex, $options: "i" } },
            { rating: { $regex: regex, $options: "i" } }
        ] 
    };

    var options = skipAndLimit(req.query.skip, req.query.limit);

    var selections = null;

    try {
        let _queryTime = Date.now();
        let locs = await Location.find(fields, selections, options);
        _queryTime = Date.now() - _queryTime;
        res.json({ count: locs.length, locations: locs, _queryTime });
    } catch (e) {
        console.log("searchLoc:", e);
        res.json({ "error": e });
    }
}

exports.fetchById = async (req, res) => {
    try {
        let location = await Location.findById(req.params.id);
        if (location) {
            res.json(location);
        }
    } catch (e) {
        console.log("fetchById:", e);
        res.json({ "error": e });
    }
}

exports.updateById = async function (req, res) {
    try {
        let location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (location) {
            res.json(location);
        }
    } catch (e) {
        console.log("updateById:", e);
        res.json({ "error": e });
    }
}

/*
res.json({
    name: "Old Lecture Hall Complex",
    description: "It has long been succeeded by the New Lecture Hall Complex and is now only the Department of Mathematics and Computing conducts classes here. It is frequently a location for celebration as this building houses a large Open Air Theatre.",
    coordinates: {
        latitude: "23.814149",
        longitude: "86.440179"
    },
    photo: {
        big: "https://kyism.ga/pixels/public/uploads/big/529d28da65ab858b611956f7c0cad4c3.jpg",
        medium: "https://kyism.ga/pixels/public/uploads/medium/529d28da65ab858b611956f7c0cad4c3.jpg",
        small: "https://kyism.ga/pixels/public/uploads/small/529d28da65ab858b611956f7c0cad4c3@2x.jpg",
        thumb: "https://kyism.ga/pixels/public/uploads/thumb/529d28da65ab858b611956f7c0cad4c3.jpeg"
    }
});
*/