const ShortURL = require ('../models/URL');

exports.createShort = async function(req, res) {
    console.log(req.body);
    let short = ShortURL({
        target: req.body.url
    });
    console.log(short);
    try {
        let url = await short.save();
        res.json(url);
        
    } catch (e) {
        console.log("createShort:", e);
        res.status(400).json(e);
    }
}

exports.redirect = async function(req, res) {
    try {
        let url = await ShortURL.findOne({ mirror: req.query.url });
        if (url && url.target) {
            if(url.target.match(/^(http:\/\/)/) || url.target.match(/^(https:\/\/)/)) {
                res.redirect(url.target);
            } else {
                res.redirect(`http://${url.target}`)
            }
        }
        throw Error(`Something's wrong! We were asked to redirect to <a href="${url.target}">${url.target}</a>. If you think this is correct, drop an email at <a href="mailto:sayhello@kyism.ml">sayhello@kyism.ml</a>.`)
    }
    catch(e) {
        console.log("redirect:", e);
        res.send(e);
    }
}