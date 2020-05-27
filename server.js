const http = require ('http');

const exp = require ('./exp.js');

const port = process.env.PORT || 8080;

const server = http.createServer(exp);

server.listen(port, () => {
	console.log(`HTTP server running at port ${port}.`);
});