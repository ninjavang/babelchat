const request = require('request');
var router = require('express').Router();

router.get('/', function(req, res, next) {     
    request('http://www.transltr.org/api/getlanguagesfortranslate', function (error, response, body) {
        res.send(body);
    });
});

module.exports = router;