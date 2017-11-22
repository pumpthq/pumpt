if(process.env.API_ENV === undefined) process.env.API_ENV = process.env.NODE_ENV
const { API_ENV } = process.env
console.log("Loading",API_ENV,"configurations")
module.exports = require(`./${API_ENV}`)
