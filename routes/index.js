let express = require('express');
const {ACCOUNT_ID, FORKS_PRE_DAY} = require("../config.machine");
let router = express.Router();
let api = require("../utils/api")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Repo Archive Machine',
        account: ACCOUNT_ID,
        used: api.invokeCount,
        limit: FORKS_PRE_DAY
    });
});

router.get("/fork", function (req, res) {
    res.redirect("/") // not support get method
})

router.post("/fork", function (req, res) {
    let owner = req.body.owner
    let repo = req.body.repo
    if (owner === ACCOUNT_ID) {
        res.status(400)
        res.render("failure")
    }
    api.fork(owner, repo).then(r => {
            console.log(`Archive ${owner}/${repo} success`)
            res.render("result", {title: 'Success', repo: `https://github.com/${ACCOUNT_ID}/${owner}-${repo}`})
        }
    ).catch(r => {
        console.log(`Archive ${owner}/${repo} failed`)
        res.status(400);
        res.render("failure", {message: r.message})
    })
})

module.exports = router;
