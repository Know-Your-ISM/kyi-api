const Dev = require ('../models/Dev');

exports.getOne = async (req, res) => {
    try {
        const dev = await Dev.findById(req.params.id);
        return res.json(dev);
    } catch (err) {
        return res.json({ "msg": "Something's not right!" });
    }
}

exports.createOne = async (req, res) => {
    if (!req.app.superApp) {
        res.status(403).json({"msg": "You don't have permissions to do that."});
    }
    else {
        if (!req.body.dev) return res.status(400).json({ "msg": "Use '{ dev: {} }' object inside request body to send details."});
        const { name, email, password } = req.body.dev;
        if (await Dev.findOne({ email })) return res.status(400).json({ "info": "Email already exists!" });
        var dev = new Dev({
            name: name || null,
            email,
            password
        });
        try {
            let devNew = await dev.save();
            return res.json({ "info": "Account created successfully.", dev: devNew });
        } catch (err) {
            res.status(500).json({ "msg": err });
        }
    }
}