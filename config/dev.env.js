'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://127.0.0.1:3333"',
    AUTH_URL : '"http://127.0.0.1:3333"',
    CLIENT_ID : '"webApp"',
    SECRET : '"123456"',
})
