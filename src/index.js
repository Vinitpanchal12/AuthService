const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');

const app = express();
const ApiRoutes = require('./routes/index');

const prepareAndStartServer= () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,() =>{
        console.log(`server running at ${PORT}`);
    } )

    app.use('/api', ApiRoutes);
}

prepareAndStartServer();