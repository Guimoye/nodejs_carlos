'use strict'

const express       = require('express')
const auth          = require('../middlewares/auth')
const productCtrl   = require('../controllers/product')
const api           = express.Router()


api.get('/product',productCtrl.getProducts) //get sin parametros
api.get('/product/:productId', productCtrl.getProduct)   //get con dos parametros
api.post('/product', productCtrl.saveProduct) //post recibiendo y enviando datos
api.put('/product/:productId', productCtrl.updateProduct) //modificar
api.delete('/product/:productId', productCtrl.deleteProduct) //eliminar
api.get('/private',auth.isAuth,function(req,res){
    res.status(200).send({message:'Tienes acceso'})
})

module.exports = api