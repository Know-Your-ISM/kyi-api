// exports.base64encoder = async function (string) {
    
// }

exports.shortenURL = async function (url, length) {
    // No use of URL?
    let len = length || 9;
    let chars = {
        "a-z": 'abcdefghijklmnopqrstuvwxyz',
        "0-9": '0123456789',
        "special": '%-=+'
    };
    let list = chars["a-z"] + chars["a-z"].toUpperCase() + chars["0-9"] + chars["special"];
    list = list.split("");

    let encodedStr = "";

    while (len --) {
        encodedStr += list[Math.floor(Math.random() * 66)];
    }

    return encodedStr;
}