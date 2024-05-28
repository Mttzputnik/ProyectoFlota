const express = require('express');
const userRoutes = require("./src/routes/user_routes");
const taskRoutes = require("./src/routes/task_routes");
const listRoutes = require("./src/routes/list_routes");
const vehicleRoutes = require("./src/routes/vehicle_routes");
const tripRoutes = require("./src/routes/trip_routes");
const maintenanceRoutes = require("./src/routes/maintenance_routes");
const documentRoutes = require("./src/routes/document_routes");
const tireRoutes = require("./src/routes/tire_routes");
const fuelConsumptionRoutes = require("./src/routes/fuelConsumption_routes");
const optimizedRouteRoutes = require("./src/routes/optimizedRoute_routes");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Middleware para el manejo de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para las operaciones del CRUD de usuarios
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);
app.use('/maintenances', maintenanceRoutes);
app.use('/documents', documentRoutes);
app.use('/tire', tireRoutes);
app.use('/fuelConsumption', fuelConsumptionRoutes);
app.use('/optimizedRoute', optimizedRouteRoutes);

// Conexión a la base de datos
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma.$connect()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error(`Error al conectar a la base de datos: ${error}`);
  });

// Iniciar el servidor
const CONNECTION_PORT = process.env.PORT || 3001;
app.listen(CONNECTION_PORT, () => {
  console.log(`El server se está ejecutando en el puerto: ${CONNECTION_PORT}`);
});
