const express = require('express');
const app = express();
const port = 2020;

app.get('/', (req, res) => {
    
    return res.send('Hello World!');
})

app.listen(port, () => { console.log('hello nodejs')})