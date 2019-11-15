const express = require('express');
const cors = require('cors');
const swig = require('swig-templates');
const axios = require('axios');
const xmljs = require('xml-js');

const app = express();
const portNum = process.env.PORT || 3000;

const whiteList = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://tyrssbe001.herokuapp.com',
    'https://stupefied-mcnulty-7f39b1.netlify.com'
];

const corsOpts = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('.html', swig.renderFile);

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/rss', cors(corsOpts), (req, res) => {
    const url = req.query.url;
    if (!url) {
        res.status(400).send('Bad request!');
    }
    axios.get(url).then((resp) => {
        const xml = xmljs.xml2json(resp.data, {compact:true});
        res.send(xml);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.listen(portNum, () => {
    console.log('server start:', portNum);
});
