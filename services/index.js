'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }

    jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken (token){
    const decoded = new Promise((resolve,reject)=>{
        try{
            const payload = jwt.decode(token,config.SECRET_TOKEN)
        }catch(err){
            reject({
                status:500,
                message: 'Invalid Token'
            })
        }
    })
}

module.exports = createToken