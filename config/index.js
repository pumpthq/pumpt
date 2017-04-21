if(process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'local'
const { NODE_ENV } = process.env
console.log("Loading",NODE_ENV,"configurations")
module.exports = require(`./${NODE_ENV}`)
