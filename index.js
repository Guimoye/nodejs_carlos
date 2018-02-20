'use strict'

const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

const Product       = require('./models/product');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//get sin parametros
app.get('/api/product',(req, res) =>{
   // res.send(200,{products:"sapo",hola:"hola"});
   Product.find({},(err,products)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`})
    if(!products) return res.status(404).send({message:'No existen productos'})
    res.status(200).send({nombre:"javier",apellido:"guimoye",products});
   })
   
  });

 

  //get con dos parametros
app.get('/api/product/:productId,:nombre',(req,res)=>{
    let productId = req.params.productId
    Product.findById(productId, (err,product)=>{
        if(err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!product) res.status(404).send({message:`El producto no existe`})

        res.status(200).send({product ,dio:req.params.nombre})
    })
});

//post recibiendo y enviando datos
app.post('/api/product',(req,res)=>{
    // res.status(200).send({message:'El producto se ha recibido',obtuve: req.body});
    console.log('POST /api/product');
    console.log(req.body);

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
})

//modificar
app.put('/api/product/:productId',(req,res)=>{

    let productId   = req.params.productId
    let update      = req.body

    Product.findByIdAndUpdate(productId,update, (err,productUpdate)=>{
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
        res.status(200).send({product: productUpdate})
        
    })

})

//eliminar
app.delete('/api/product/:productID',(req,res)=>{
    let productId = req.params.productId
    let eliminar  = req.body
/*
    Product.findByIdAndRemove(productId,eliminar, (err,productRemove)=>{
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
        res.status(200).send({product: productRemove})
        
    })

*/
    Product.findById(productId,(err,product)=>{
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
            res.status(200).send({message: `el producto ha sido eliminado`})
        })

    })
    

});

//conexion mongo
mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{

    if(err) throw err
    console.log('Conexion a la bade de datos establecida');

    app.listen(port,()=>{
        console.log(`API REST corriendo en https://localhost:${port}`);
    });

});

