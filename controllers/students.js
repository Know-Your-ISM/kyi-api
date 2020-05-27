const BTech = require("../models/BTech");
const MTech = require("../models/MTech");

exports.getAll = async (req, res) => {
    var students = [];
    try {
        if (req.query.course === "btech") {
            students = await BTech.find({}, "Name Place Branch House Sex", {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit)
            });
        } else if (req.query.course === "mtech") {
            students = await MTech.find({}, "Name Place Branch House Sex", {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit)
            });
        } else {
            const btech = await BTech.find({}, "Name Place Branch House Sex", {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit)
            });
            const mtech = await MTech.find({}, "Name Place Branch House Sex", {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit)
            });
            students = [ ...btech, ...mtech ];
        }
        return res.status(200).json({ "count": students.length, "students": students });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error });
    }
}

exports.getOne = async (req, res) => {
    var student = {};
    try {
        if (req.query.course === "btech") {
            student = await BTech.findById(req.params.id);
        } else if (req.query.course === "mtech") {
            student = await MTech.findById(req.params.id);
        } else {
            student = await BTech.findById(req.params.id);
        }
        return res.status(200).json(student);
    }
    catch (error) {
        return res.status(500).json({ "message": error });
    }
}

exports.create = (req, res) => {
    const message = "This route is under construction.";
    res.status(400).json(message);
}