
'use strict'

const Product       = require('../models/product'); //sube una carpeta para buscar el modelo

function getProduct(req,res){
    let productId = req.params.productId

    Product.findById(productId, (err,product)=>{
        if(err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!product) res.status(404).send({message:`El producto no existe`})
        res.status(200).send({product ,dio:req.params.nombre})
    })
}

function getProducts(req,res){
    Product.find({},(err,products)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!products) return res.status(404).send({message:'No existen productos'})
        res.status(200).send({nombre:"javier",apellido:"guimoye",products});
       })
}

function saveProduct(req,res){
    console.log('POST /api/product');
    console.log(req.body);
    
    console.log('\nsalto');
    console.log(res.body);

    //para almacenar en la bd
    let product         = new Product()
    product.name        = req.body.name
    product.picture     = req.body.picture
    product.price       = req.body.price
    product.category    = req.body.category
    product.description = req.body.description

    product.save((err,productStored)=>{
        if(err) res.status(500).send({message: `Error al salvar en la base de dato: ${err}`})
        res.status(500).send({message:`hola`,product:productStored})
    })
}

function updateProduct(req,res){

    let productId   = req.params.productId
    let update      = req.body

    Product.findByIdAndUpdate(productId,update, (err,productUpdate)=>{
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
        res.status(200).send({product: productUpdate})
        
    })

}

function deleteProduct(req,res){
    let productId = req.params.productId

    Product.findById(productId,(err,product)=>{
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
            res.status(200).send({message: `el producto ha sido eliminado`})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}