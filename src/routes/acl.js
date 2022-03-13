'use strict';

const express = require ('express');
const app = express.Router();
const bearerAuth = require('../middleware/bearerAuth.js');
const acl = require('../middleware/acl')





app.get('/img', bearerAuth, acl('read'), (req, res) => {
    res.send('you can read this image');
});

app.post('/img', bearerAuth, acl('create'), (req, res) => {
    res.send('new image was created');
});

app.put('/img', bearerAuth, acl('update'), (req, res) => {
    res.send('image updated');
});

app.delete('/img', bearerAuth, acl('delete'), (req, res) => {
    res.send('image deleted');
});

module.exports = app