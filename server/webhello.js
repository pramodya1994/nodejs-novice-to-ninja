#!/usr/bin/env node

const
    port = (process.argv[2] || process.env.PORT || 3000), // defines variable for server port
    http = require('http');

http.createServer((req, res) => { // create web server which listens to the above port

    console.log(req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<p>Hello World!</p>`);

}).listen(port);

console.log(`Server running at http://localhost:${ port }/`);
