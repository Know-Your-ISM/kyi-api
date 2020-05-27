const BTech = require("../models/BTech");
const MTech = require("../models/MTech");

exports.querySearch = async (req, res) => {
    const query = req.query;

    var searchableObject = {};

    if(query.name) {
        searchableObject["Name"] = {
            $regex: new RegExp (query.name.toString().toLowerCase()),
            $options: 'i'
        };
	}
	
	if(query.admno) {
        searchableObject["Admission No"] = {
            $regex: new RegExp (query["admno"].toString().toLowerCase()),
            $options: 'i'
        };
	}
	
	if(query.place) {
        searchableObject["Place"] = {
            $regex: new RegExp (query.place.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if (query.sex) {
        searchableObject.Sex = {
            $regex: new RegExp (query.sex.toString().toLowerCase()),
            $options: 'i'
        };
	}
	
	if (query.house) {
        searchableObject.House = {
            $regex: new RegExp (query.house.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if(query.branch) {
        searchableObject.Branch = {
            $regex: new RegExp (query.admin.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if(query.intern) {
        searchableObject.Internship = {
            $regex: new RegExp (query.intern.toString().toLowerCase()),
            $options: 'i'
        };
    }

    var students = [];

    if ((query.course === "btech")) {
        students = await BTech.find(searchableObject, "Name Place Branch House Sex", {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });
    } else if (query.course === "mtech") {
        students = await MTech.find(searchableObject, "Name Place Branch House Sex", {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });
    } else {
        const btech = await BTech.find(searchableObject, "Name Place Branch House Sex", {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });

        const mtech = await MTech.find(searchableObject, "Name Place Branch House Sex", {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        });

        students = [ ...btech, ...mtech ];
    }

    res.json({ "count": students.length, students });
}