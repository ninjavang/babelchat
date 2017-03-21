const router = require('express').Router();
const users = require('./users');
const request = require('request');
const languages = require('./languages');

router.use('/users', users);
router.use('/languages', languages)
module.exports = router;