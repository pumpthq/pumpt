const config = { NODE_ENV, HOST, PORT, REMOTE_API_HOST, REMOTE_API_PORT } = require('./config')
module.exports = {
  "apps": [{
    "name": "pumpt-spa2",
    "script": "server",
    "watch": true,
    "exec_mode": "cluster",
    "instances": 1,
    "merge_logs": true,
    "cwd": "./",
    "env": config
  }]
}
