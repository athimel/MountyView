const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let url = require('url').parse(req.url, true);

    if (url.query && url.query.id) {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        fs = require('fs');

        let id = url.query.id;
        let name = `vues/${id}.txt`;
        console.log(`Lecture de la vue ${name}`);
        fs.readFile(name, 'utf8', function (err, data) {
            if (err) {
                return console.error(err);
            }
            res.end(data);
        });
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.end("Faut un id");
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
