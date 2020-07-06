const Review = require ("../models/Review");
let Filter = require ('bad-words'),
    filter = new Filter({ placeHolder: '*' });

async function getPopulatedReviews(_id, r_id, s_id) {
    let queryObject = {};
    if (_id) queryObject._id = _id;
    if (r_id) queryObject.restaurant = r_id;
    if (s_id) queryObject.student = s_id;

    let revs = await Review.find(queryObject);
    var populated = await Review.populate(revs, 'student');

    return populated;
}

async function getOneAndDoAction(_id, action, body) {

    function handleErrors (e) {
        console.log("getOneAndDoAction:", e);
        return null;
    }

    if (action === 'delete') {
        try {
            let rev = await Review.findByIdAndDelete(_id);
            return rev;
        } catch (e) {
            return handleErrors(e);
        }
    } else if (action === 'update') {
        try {
            let rev = await Review.findByIdAndUpdate(_id, body, { new: true });
            return (await rev.populate('student').populate('restaurant').execPopulate());
        } catch (e) {
            return handleErrors(e);
        }
    } else if (action === 'populate') {
        try {
            let rev = await Review.findById(_id);
            return (await rev.populate('student').populate('restaurant').execPopulate());
        } catch (e) {
            return handleErrors(e);
        }
    }

    return null;
}

exports.getById = async function (req, res) {
    try {
        let rev = await getOneAndDoAction(req.params.id, 'populate');
        res.json(rev);
    } catch (e) {
        res.status(parseInt(e.status) || 500).json({ "error": e });
    }
}

exports.getByRestaurant = async function (req, res) {
    try {
        let _queryTime = Date.now();
        let revs = await getPopulatedReviews(null, req.params.id);
        _queryTime = Date.now() - _queryTime;
        res.json({
            count: revs.length,
            reviews: revs,
            _queryTime
        });
    } catch (e) {
        res.status(500).json({ "error": e });
    }
}

exports.getByStudent = async function (req, res) {
    try {
        let _queryTime = Date.now();
        let revs = await getPopulatedReviews(null, null, req.params.id);
        _queryTime = Date.now() - _queryTime;
        res.json({
            count: revs.length,
            reviews: revs,
            _queryTime
        });
    } catch (e) {
        res.status(500).json({ "error": e });
    }
}

exports.getByFilters = async function (req, res) {
    let r_id, s_id;
    if (req.query.restaurant && req.query.restaurant.length >= 11) {
        r_id = req.query.restaurant;
    }
    if (req.query.studentya && req.query.student.length >= 11) {
        s_id = req.query.student;
    }

    let _queryTime = Date.now();
    let revs = await getPopulatedReviews(null, r_id, s_id);
    _queryTime = Date.now() - _queryTime;

    if (revs && revs.length) {
        res.json({ 
            count: revs.length, 
            reviews: revs, 
            _queryTime 
        });
    } else {
        res.status(500).json({ 
            "error": "Don't trust the status code, but something is certainly wrong." 
        });
    }
}

function validateReview (req_body) {
    let body = req_body;
    if (body.rating) {
        console.log("of course here");
        let { ambience, service, food } = body.rating;
        body.rating.ambience = ambience ? parseInt(ambience) : 0;
        body.rating.service = service ? parseInt(service) : 0;
        body.rating.food = food ? parseInt(food) : 0;
    }
    if (body.content) {
        console.log("reached here");
        body.content = filter.clean(body.content);
    }
    if (body.title) {
        console.log("here as well");
        body.title = filter.clean(body.title);
    }
    if (body.favourite) {
        console.log("and here");
        body.favourite = filter.clean(body.favourite);
    }
    return body;
}

exports.createReview = async function (req, res) {
    // Add alidation so that only one review per student exists for one restaurant.
    let body = validateReview(req.body);
    try {
        let rev = new Review(body);
        let savedRev = await rev.save();
        savedRev = await savedRev.populate('student').populate('restaurant').execPopulate();
        res.json({
            info: "Saved review.",
            review: savedRev
        });
    } catch (e) {
        console.log("createReview:", e);
        res.status(parseInt(e.status) || 500).json({ "error": e });
    }
}

exports.updateReview = async function (req, res) {
    let rev = await getOneAndDoAction(req.params.id, 'update', validateReview(req.body));
    if (!rev) {
        res.status(500).json({ "error": "Something's wrong! Maybe the id?" });
    }
    res.json(rev);
}

exports.deleteReview = async function (req, res) {
    let rev = await getOneAndDoAction(req.params.id, 'delete');
    if (rev) {
        res.json(rev);
    } else {
        res.status(500).json({ "error": "Something's wrong! Maybe the id?" });
    }
}