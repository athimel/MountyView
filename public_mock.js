const http = require('http');

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {

    let url = require('url').parse(req.url, true);

    if (url.query && url.query.file) {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        // res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1');
        fs = require('fs');

        let file = url.query.file;
        let name = `public/${file}`;
        console.log(`Lecture du fichier ${name}`);
        fs.readFile(name, 'utf8', function (err, data) {
            if (err) {
                return console.error(err);
            }
            res.end(data);
            // let parser = require('./vue_parser.js');
            // let parseResult = parser.parseVue(data);
            // console.log(`parseResult : `, parseResult);
        });
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.end("Faut un file");
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
