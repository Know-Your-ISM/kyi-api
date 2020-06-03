const jwt = require ('jsonwebtoken');
const App = require ('../../models/App');

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
        if (!token) throw new Error();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const app = await App.findOne({_id: decoded._id, key: token});

        if (!app) throw new Error();
        
        req.app = app;
        next();
    }
    catch (err) {
        console.log (err);
        res.status(400).json({"message": "Authentication Error. Check the supplied credentials."});
    }
}