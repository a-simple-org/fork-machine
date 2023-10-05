const {FORK_TOKEN, ACCOUNT_ID} = require("../config.machine");
let Octokit = require("@octokit/core").Octokit

const octokit = new Octokit({
    auth: FORK_TOKEN
})

exports.fork = async function (owner, repo) {
    console.log(`Forking ${owner}/${repo}`)
    return await octokit.request('POST /repos/{owner}/{repo}/forks', {
        owner: owner,
        repo: repo,
        organization: ACCOUNT_ID,
        name: `${owner}-${repo}`,
        default_branch_only: true,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}
