const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {

    let url = require('url').parse(req.url, true);

    if (url.query && url.query.id) {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');

        let id = url.query.id;
        let rawUrl = `http://127.0.0.1:3000/?id=${id}`;
        console.log(`Appel de l'URL ${rawUrl}`);
        let someRequest = http.request(rawUrl, function(response) {
            let data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                let parser = require('./vue_parser.js');
                let parseResultPromise = parser.parseVue(data);
                parseResultPromise.then(function(parseResult) {
                    res.end(JSON.stringify(parseResult));
                });
            });

        });
        someRequest.end();

    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.end("Faut un id");
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
