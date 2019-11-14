const express = require('express');
const cors = require('cors');

const app = express();
const portNum = process.env.PORT || 3000;

const whiteList = ['http://localhost', 'https://tyrssbe001.herokuapp.com'];
const corsOpts = {
    origin: (origin, callback) => {
        if (origin) {
            const host = origin.substring(0, origin.lastIndexOf(':'));
            if (whiteList.indexOf(host) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.get('/', cors(corsOpts), (req, res) => {
    console.log(req.query);
    res.send('hello!');
});

app.get('/hoge', (req, res) => {
    res.send('hoge!');
});

app.listen(portNum, () => {
    console.log('server start:', portNum);
});
