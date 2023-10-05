# Fork Machine

> Warn: Do not overuse ForkMachine, use your own risk

## Setup your own machine

1. Register a GitHub account
2. Create a [token](https://github.com/settings/tokens)
3. Set var FORK_TOKEN to your access token in config.machine.js
4. Do `node www/bin` to start the ForkMachine

## Default config file

> You may need create a file named "config.machine.js"

Config file looks like this

```js
// Fork machine account's token
exports.FORK_TOKEN = "ghp_xxx" // replace with your own
// Fork Machine's id
exports.ACCOUNT_ID = "a-simple-org"
// Fork limit
exports.FORKS_PRE_DAY = 10
```
