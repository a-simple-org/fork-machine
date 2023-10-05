let express = require('express');
let router = express.Router();

let api = require("../utils/api")

/* GET home page. */
router.get('/fork/:owner/:repo', function(req, res, next) {
    try {
        api.fork(req.params.owner, req.params.repo) // do fork
        res.send("Success")
    } catch (e) {
        res.status(400)
        res.send("Failure " + e.message)
    }
});

module.exports = router;

