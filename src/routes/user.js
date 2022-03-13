'use strict';

const express = require ('express');
const routers = express.Router();

const {user} = require('../models/index');
const bcrypt = require('bcrypt');

const basicAuth = require('../middleware/baiscAuth');
const bearerAuth = require('../middleware/bearerAuth.js');




routers.post('/signin',basicAuth,()=>{

})

routers.get('/secretstuff',bearerAuth,(req,res)=>{
    res.status(200).json(req.User);
})

routers.post('/signup', async (req, res, next) => {
    let { username, password, role } = req.body;
    try {
        
        let hashedPassword = await bcrypt.hash(password,5)
        console.log(hashedPassword);
        console.log(user);
    
        const newUser = await user.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        next('invalid signUp');
    }
});

module.exports = routers;