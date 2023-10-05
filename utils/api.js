const {FORK_TOKEN, ACCOUNT_ID, FORKS_PRE_DAY} = require("../config.machine");
let Octokit = require("@octokit/core").Octokit

const octokit = new Octokit({
    auth: FORK_TOKEN
})

exports.invokeCount = 0;

let lastInvoke = ""

exports.fork = async function (owner, repo) {
    console.log(`Forking ${owner}/${repo}`)
    let date = new Date()
    let timeNow = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
    if (lastInvoke !== timeNow) {
        exports.invokeCount = 0 // reset count
    } else if (exports.invokeCount >= FORKS_PRE_DAY) {
        throw "API invoke limit reached"
    }
    lastInvoke = timeNow
    return await octokit.request('POST /repos/{owner}/{repo}/forks', {
        owner: owner,
        repo: repo,
        organization: ACCOUNT_ID,
        name: `${owner}-${repo}`,
        default_branch_only: true,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then(r => {
        exports.invokeCount++
    })
}
