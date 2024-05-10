const express = require('express');
const userRoutes = require("./src/routes/user_routes");
const bodyParser = require("body-parser");
const cors = require('cors');
require( 'dotenv' ).config() ;

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Middleware para el manejo de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// rutas para las operaciones del CRUD de usuarios
app.use('/users', userRoutes);



//comprobar la conexion a la base de datos
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma.$connect()
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch((error) => {
    console.error(`Error al conectar a la base de datos: ${error}`);
});

  

// iniciar el servidor
const CONNECTION_PORT = process.env.PORT || 3001;
app.listen(CONNECTION_PORT,()=>{
    console.log(`El server se esta ejecutando en el puerto: ${CONNECTION_PORT}`);
});