const BTech = require("../models/BTech");
const MTech = require("../models/MTech");

const sharp = require("sharp");
const { createSeachableObject, skipAndLimit } = require("../middleware/utils/params");

exports.getAll = async (req, res) => {
    var students = [];
    let options = skipAndLimit(req.query.skip, req.query.limit);
    let options2 = skipAndLimit(parseInt(req.query.skip)/2, parseInt(req.query.limit)/2);
    try {
        if (req.query.course === "btech") {
            students = await BTech.find({}, "Name Place Branch House Sex", options)
        } else if (req.query.course === "mtech") {
            students = await MTech.find({}, "Name Place Branch House Sex", options);
        } else {
            const btech = await BTech.find({}, "Name Place Branch House Sex", options2);
            const mtech = await MTech.find({}, "Name Place Branch House Sex", options2);
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

/**
 * Validates supplied imaged buffer by resizing image to
 * 500px * 500px. This function uses Sharp Module for validation.
 *
 * @param {*} original buffer
 * @param {*} mimetype string: "image/png", "image/jpg", "image/tiff", "image/bmp"
 * @returns validated buffer of supplied image buffer.
 */
async function sharpValidation(original, mimetype) {
    var buffer = original;
    if (mimetype == "image/png") {
        buffer = await sharp(original)
            .resize({
                width: 500,
                height: 500
            })
            .png()
            .toBuffer();
    }

    if (mimetype == "image/jpg") {
        buffer = await sharp(original)
            .resize({
                width: 500,
                height: 500
            })
            .jpg()
            .toBuffer();
    }

    if (mimetype == "image/tiff") {
        buffer = await sharp(original)
            .resize({
                width: 500,
                height: 500
            })
            .tiff()
            .toBuffer();
    }

    if (mimetype == "image/bmp") {
        buffer = await sharp(original)
            .resize({
                width: 500,
                height: 500
            })
            .bmp()
            .toBuffer();
    }

    return buffer;
}

exports.create = async (req, res) => {
    let student;
    let regex = new RegExp(req.body["Admission No"], "i");
    try {
        if (req.body["kyi-db-identifier"] = "BTech") {
            student = new BTech(req.body);
            await Btech.findOneAndDelete({"Admission No": { $regex: regex }});
        }
        else { // This block should be for MTech.
            student = new Btech(req.body);
            await Btech.findOneAndDelete({"Admission No": { $regex: regex }});
        }

        if (req.file) {
            student.Photo = await sharpValidation(req.file.buffer, req.file.mimetype);
            student.format = req.file.mimetype;
        }


        let saved = await student.save();

        res.json({ "info" : "Student saved.", student: saved });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ "message": e });
    }
}

/**
 * Finds and responds with avatar of the user
 * whose details are supplied in the request body.
 *
 * @param {*} req
 * @param {*} res
 * @returns response: image 200 || 500
 */
exports.getPhoto = async (req, res) => {
    var student = await BTech.findById(req.params.id);
    if (!student)
        student = await MTech.findById(req.params.id);
    try {
        if (!student || !student.Photo) {
            throw new Error('No photo found for this user.');
        }
        res.set('Content-Type', student.format);
        return res.status(200).send(student.Photo);
    }
    catch (err) {
        return res.status(500).json({ "message": err });
    }
}

exports.verify = async (req, res) => {
    try {
        let student = await BTech.findOne({ "Admission No": { $regex: new RegExp("^" + req.params.admno + "$", "i") } });
        if (student) {
            return res.json({ status: "Verified", student });
        }
        else {
            student = await MTech.findOne({ "Admission No": { $regex: new RegExp("^" + req.params.admno + "$", "i") } });
            if (student) {
                return res.json({ status: "Verified", student });
            }
            else {
                return res.json({ status: "Unverifed" });
            }
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
}

exports.updateOne = async (req, res) => {
    try {
        let student = await BTech.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(student)
    } catch (e) {
        res.status(500).json({ "error": e });
        console.log("updateOne:", e);
    }
}

exports.number = async (req, res) => {
    try {
        let query = req.query;
        let searchableObject = createSeachableObject(query);
        let number = 0;

        let _queryTime = Date.now();
        if ((query.course === "btech")) {
            number = await BTech.countDocuments(searchableObject);
        } else if (query.course === "mtech") {
            number = await MTech.countDocuments(searchableObject);
        } else {
            number = await BTech.countDocuments(searchableObject);
            number += await MTech.countDocuments(searchableObject);
        }

        _queryTime = Date.now() - _queryTime;

        res.json({ count: number, _queryTime });
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
}