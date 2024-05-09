const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

// Importar el controlador de usuario
const userController = require('./src/controllers/UserController');

// Middleware para parsear el body de las peticiones
app.use(express.json());

// Definir las rutas para las operaciones CRUD del usuario
app.get('/users', userController.getAllUsers);
app.post('/users/new', userController.createUser);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUserById);
app.delete('/users/:id', userController.deleteUserById);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
