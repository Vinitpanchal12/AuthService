const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const db = require('./models/index')

const app = express();

const ApiRoutes = require('./routes/index');

const prepareAndStartServer= () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,async () =>{
        console.log(`server running at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
       
    } );

    

    app.use('/api', ApiRoutes);
}

prepareAndStartServer();