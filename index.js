'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
/*
app.get('api/product',(req,res)=>{
    res.send(200,{products:[]});
});
*/

app.get('/api/product',(req, res) =>{
   // res.send(200,{products:"sapo",hola:"hola"});
    res.status(200).send({products:"sapo",hola:"hola"});
  });

 

app.get('/api/product:productId',(req,res)=>{

});

app.post('/api/product',(req,res)=>{
    console.log(req.body);
   // res.send(200,{message:'El producto se ha recibido',obtuve: req.body});
    res.status(200).send({message:'El producto se ha recibido',obtuve: req.body});

});

app.put('/api/product:productId',(req,res)=>{

});

app.delete('/api/product:productID',(req,res)=>{

});

app.listen(port,()=>{
    console.log(`API REST corriendo en https://localhost:${port}`);
});