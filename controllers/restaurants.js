const Restaurant = require ('../models/Restaurant');
const { skipAndLimit } = require('../middleware/utils/params');

exports.createRestaurant = async function(req, res) {
    let { 
        name, latitude, longitude, events,
        big, medium, small, thumb, 
        rickshaw, for2, for4, for6,
        description, propertyType, plusID,
        ambience, service, food, alcohol } = req.body;

    try {
        let loc = new Restaurant({
            name: name,
            propertyType: propertyType || "Restaurant",
            photo: {
                big: big || "",
                medium: medium || "",
                small: small || "",
                thumb: thumb || ""
            },
            costs: {
                rickshaw: rickshaw || 0,
                spending: {
                    for2: for2 || 0,
                    for4: for4 || 0,
                    for6: for6 || 0
                }
            },
            rating: {
                ambience: ambience || 0,
                service: service || 0,
                food: food || 0
            },
            coordinates: {
                latitude: latitude || "",
                longitude: longitude || "",
                plusID: plusID || ""
            },
            description: description || "",
            alcohol: alcohol || "",
            events: events || "Not available"
        });

        let savedLoc = await loc.save();

        res.json({ info: "Restaurant saved.", location: savedLoc });
    } catch (e) {
        console.log("createLoc", e);
        res.status(parseInt(e.status) || 500).json({ "error": e });
    }
}

exports.fetchAll = async (req, res) => {
    try {
        let _queryTime = Date.now();
        let locs = await Restaurant.find({ propertyType: "Restaurant" }, null, {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });
        _queryTime = Date.now() - _queryTime;
        res.json({ count: locs.length, locations: locs, _queryTime });
    } catch (e) {
        console.log("fetchRestaurantLoc:", e);
        res.status(500).json({ "error": e });
    }
}

exports.fetchById = async (req, res) => {
    try {
        let location = await Restaurant.findById(req.params.id);
        if (location) {
            res.json(location);
        }
    } catch (e) {
        console.log("fetchById:", e);
        res.json({ "error": e });
    }
}

exports.deleteById = async function (req, res) {
    try {
        let location = await Restaurant.findByIdAndDelete(req.params.id);
        if (location) {
            res.json(location);
        }
    } catch (e) {
        console.log("deleteById:", e);
        res.json({ "error": e });
    }
}

exports.updateById = async function (req, res) {
    try {
        let location = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (location) {
            res.json(location);
        }
    } catch (e) {
        console.log("updateById:", e);
        res.json({ "error": e });
    }
}

exports.searchRestaurant = async function (req, res) {
    let regex = new RegExp (req.params.query);
    var fields = { 
        $or: [
            { name: { $regex: regex, $options: "i" } },
            { "propertyType": { $regex: regex, $options: "i" } },
            { "description": { $regex: regex, $options: "i" } },
            { "coordinates.longitude": { $regex: regex, $options: "i" } },
            { "coordinates.latitude": { $regex: regex, $options: "i" } }, 
            { "coordinates.plusID": { $regex: regex, $options: "i" } }
        ] 
    };

    var options = skipAndLimit(req.query.skip, req.query.limit);

    var selections = null;

    try {
        let _queryTime = Date.now();
        let locs = await Restaurant.find(fields, selections, options);
        _queryTime = Date.now() - _queryTime;
        res.json({ count: locs.length, restaurants: locs, _queryTime });
    } catch (e) {
        console.log("searchLoc:", e);
        res.json({ "error": e });
    }
}