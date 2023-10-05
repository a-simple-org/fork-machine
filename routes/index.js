let express = require('express');
const {ACCOUNT_ID} = require("../config.machine");
let router = express.Router();
let api = require("../utils/api")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Repo Archive Machine', account: ACCOUNT_ID});
});

router.get("/fork", function (req, res) {
    res.redirect("/") // not support get method
})

router.post("/fork", function (req, res) {
    let owner = req.query.owner
    let repo = req.query.repo
    if (owner === ACCOUNT_ID) {
        res.status(400)
        res.render("failure")
    }
    api.fork(owner, repo).then(r => {
            if (r.status === 202) {
                console.log(`Archive ${owner}/${repo} success`)
                res.render("result", {title: 'Success', repo: `https://github.com/${ACCOUNT_ID}/${owner}-${repo}`})
            }
        }
    ).catch(r => {
        console.log(`Archive ${owner}/${repo} failed`)
        res.status(400);
        res.render("failure")
    })
})

module.exports = router;
