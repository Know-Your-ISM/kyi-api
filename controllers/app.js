const App = require('../models/App');

exports.getOne = (req, res) => {
    if (req.app) return res.json(req.app);
    else return res.json({ "msg": "Something's not right!" });
}

exports.createOne = async (req, res) => {
    if (!req.app.superApp) {
        res.status(403).json({"msg": "You don't have permissions to do that."});
    }
    else {
        const { name, platform, owner, url } = req.body.app;
        var app = new App({
            name,
            platform: platform || "x-platform",
            owner,
            url: url || null
        });
        app.signKey();
        try {
            let appNew = await app.save();
            return res.json({"info": "App signed successfully.", key: appNew.key});
        } catch (err) {
            res.status(500).json({ "msg": err });
        }
    }
}