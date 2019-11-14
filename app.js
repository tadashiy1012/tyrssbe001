const express = require('express');

const app = express();

const portNum = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello!');
});

app.listen(portNum, () => {
    console.log('server start:', portNum);
});
