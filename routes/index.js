const router = require('express').Router();
const request = require('request');
const languages = require('./languages');

router.use('/languages', languages)
module.exports = router;