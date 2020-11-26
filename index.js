const app = require('express')(),
      fetch = require('node-fetch');

app.get('/', (req, res) => {
    res.sendFile('./client/index.html', { root: __dirname } );
});

app.get('/client/:file', (req, res) => {
    res.sendFile('./client/' + req.params.file, { root: __dirname });
});

app.get('/jobs', (req, res) => {
    fetch('http://localhost:8080/jobs')
    .then(response => response.json())
    .then(data => res.status(200).send(data))
    .catch(err => {
        console.error(err);
        res.status(500).end();
    });
});

app.listen(80);