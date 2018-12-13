'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://127.0.0.1:8081"',
    AUTH_URL : '"http://127.0.0.1:8081"',
    CLIENT_ID : '"webApp"',
    SECRET : '"123456"',
})
