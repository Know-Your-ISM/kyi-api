const BTech = require("../models/BTech");
const MTech = require("../models/MTech");
const { createSeachableObject, skipAndLimit } = require("../middleware/utils/params");

exports.querySearch = async (req, res) => {
    const query = req.query;
    // var selections = "Name City State Course Department House Sex Clubs admno";
    var selections = null;
    var options = skipAndLimit(req.query.skip, req.query.limit);
    let options2 = skipAndLimit(parseInt(req.query.skip)/2, parseInt(req.query.limit)/2);

    var searchableObject = createSeachableObject(query);

    var students = [];

    try {
        let _queryTime = Date.now();
        if ((query.course === "btech")) {
            students = await BTech.find(searchableObject, selections, options);
        } else if (query.course === "mtech") {
            students = await MTech.find(searchableObject, selections, options);
        } else {
            const btech = await BTech.find(searchableObject, selections, options2);
            const mtech = await MTech.find(searchableObject, selections, options2);

            students = [ ...btech, ...mtech ];
        }

        _queryTime = Date.now() - _queryTime;
        console.log(`${students.length} ${students.length > 1 ? 'results' : 'result'} in ${_queryTime/1000} second.`);

        res.json({ "count": students.length, students, _queryTime });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ "msg": e });
    }
}

exports.findByQuery = async function (req, res) {
    let regex = new RegExp (req.params.query);
    var results = [];
    var fields = { 
        $or: [ 
                { Name: { $regex: regex, $options: "i" } },
                { "Admission No": { $regex: regex, $options: "i" } },
                { Department: { $regex: regex, $options: "i" } },
                { City: { $regex: regex, $options: "i" } },
                { State: { $regex: regex, $options: "i" } }, 
                { Sex: { $regex: regex, $options: "i" } }, 
                { House: { $regex: regex, $options: "i" } }
            ] 
    };
    // var selections = "Name City State Course Department House Sex Clubs admno";
    var selections = null;
    var options = skipAndLimit(req.query.skip, req.query.limit);

    try {
        let _queryTime = Date.now();
        if (req.query.course === "btech") {
            const btech = await BTech.find(fields, selections, options);
            results = [...btech];
        } else if (req.query.course === "mtech") {
            const mtech = await MTech.find(fields, selections, options);
            results = [...mtech];
        } else {
            // limit: 10 will deliver 10 documents, 5 each from BTech and MTech.
            const btech = await BTech.find(fields, selections, {
                skip: Math.floor(parseInt(req.query.skip)/2),
                limit: Math.floor(parseInt(req.query.limit)/2)
            });
            const mtech = await MTech.find(fields, selections, {
                skip: Math.floor(parseInt(req.query.skip)/2),
                limit: Math.floor(parseInt(req.query.limit)/2)
            });
            results = [...btech, ...mtech];
        }
        _queryTime = Date.now() - _queryTime;
        console.log(`${results.length} ${results.length > 1 ? 'results' : 'result'} in ${_queryTime/1000} second.`);

        res.json({ count: results.length, results, _queryTime });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ "msg": e });
    }
}