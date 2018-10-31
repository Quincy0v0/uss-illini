var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ships', function(req, res, next) {
    res.json([{
        id: 1,
        username: "shimakaze"
    }, {
        id: 2,
        username: "minotaurs"
    }]);
});

module.exports = router;
