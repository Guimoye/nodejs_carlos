'use strict'

const express       = require('express')
const api           = express.Router()
const productCtrl   = require('../controllers/product')

api.get('/product',productCtrl.getProducts) //get sin parametros
api.get('/product/:productId', productCtrl.getProduct)   //get con dos parametros
api.post('/product', productCtrl.saveProduct) //post recibiendo y enviando datos
api.put('/product/:productId', productCtrl.updateProduct) //modificar
api.delete('/product/:productId', productCtrl.deleteProduct) //eliminar

module.exports = api