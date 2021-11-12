const expressJwt = require('express-jwt')

function authJwt(){
    const secret = process.env.TOKEN_PASSWORD
    // the functions checks in all the routes the token for validation
    return expressJwt({
        secret, 
        algorithms: ['HS256']
    })
    // with the unless method we exclude some routes to validate through tokens
    .unless({
        path: [
            '/api/v1/users/login',
            {url: '/api/v1/users', methods:["GET", "POST"]},
            {url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"]},
            {url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"]}
        ]
    })
}

module.exports = authJwt