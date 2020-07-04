const express = require('express');
const multer = require('multer');

const students = require ("../controllers/students.js");
const auth = require ("../middleware/auth/app");

const router = express.Router();

const fileFilter = function fileFilter (req, file, callback)
{
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/tiff' || file.mimetype == 'image/bmp' || file.mimetype == 'image/png') {
        callback(null, true);
    }
    else{
        callback(null, false);
        console.log('Only jpeg, tiff, bmp and png file types are allowed!');
    }
}

const upload = multer({limits: {fileSize: 5242880}, fileFilter});

router.get("/", auth.auth, students.getAll);

router.get("/:id", auth.auth, students.getOne);

router.post("/", upload.single("Photo"), students.create);

router.get("/avatar/:id", students.getPhoto);

router.get("/verification/:admno", students.verify);

router.patch("/:id", students.updateOne);

router.get("/quantities/number", students.number);

module.exports = router;

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ3YTczMjg4NjRiNTRjMmEwZTJjNDIiLCJuYW1lIjoiQW5kcm9pZCBSb290IiwiaWF0IjoxNTkxMTkxMzQ2fQ.TsyelRUy49mBD-bFhFShoK-LJR3adlWvJA2mXgtTX4k
*/