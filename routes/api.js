let express = require('express');
let router = express.Router();

let api = require("../utils/api")

/* GET home page. */
router.get('/fork/:owner/:repo', function(req, res, next) {
    api.fork(req.params.owner, req.params.repo).then(r => {
        res.send("success")
    }).catch(r => {
        res.status(r.status)
        res.send("Failure to fork")
    })
});

module.exports = router;

