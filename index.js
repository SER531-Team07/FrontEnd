const app = require('express')(),
      cors = require('cors'),
      fetch = require('node-fetch');

const sparqlService = 'http://localhost:8080';

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('./client/index.html', { root: __dirname } );
});

app.get('/client/:file', (req, res) => {
    res.sendFile('./client/' + req.params.file, { root: __dirname });
});

app.get('/jobs', (req, res) => {
    fetch(sparqlService + req.url)
    .then(response => response.json())
    .then(data => res.status(200).send(data))
    .catch(err => {
        console.error(err);
        res.status(500).end();
    });
});

app.get('/visualization/:path', (req, res) => {
    var url = sparqlService + req.url;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).end();
    })
})

app.listen(80);