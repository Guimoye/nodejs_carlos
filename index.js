
'use strict'

const mongoose  = require('mongoose');
const app       = require('./app')
const config    = require('./config')

//conexion mongo
mongoose.connect(config.db,(err,res)=>{

    if(err) throw err
    console.log('Conexion a la bade de datos establecida');

    app.listen(config.port,()=>{
        console.log(`API REST corriendo en https://localhost:${config.port}`);
    });

});

