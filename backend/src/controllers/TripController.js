const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los trips
const listTrip = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las trips ${error}` });
  }
};

// Crear un nuevo trip
const createTrip = async (req, res) => {
  const { vehicleId, startDate, userId, endDate, route, distanceTraveled, travelTime } = req.body;

  vehicleId, startDate, userId, endDate, route, distanceTraveled, travelTime         

  try {
    const newTrip = await prisma.trip.create({
      data: {
        vehicleId, startDate, userId, endDate, route, distanceTraveled, travelTime
      },
    });
    res.status(200).json(newTrip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el trip ${error}` });
  }
};

// Obtener un trip por id
const getTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: id },
    });
    if (!trip) {
      return res.status(404).json({ error: `Trip  no encontrado` });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Trip ${error}` });
  }
};

// Actualizar un trip por id
const editTrip = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, startDate, userId, endDate, route, distanceTraveled, travelTime } = req.body;

  try {
    const updateData = {
      vehicleId, startDate, userId, endDate, route, distanceTraveled, travelTime
    };

    const trip = await prisma.trip.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la trip : ${error.message}` });
  }
};

// Eliminar una trip por id
const deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.trip.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "trip eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el trip ${error}` });
  }
};

module.exports = {
  createTrip,
  deleteTrip,
  editTrip,
  getTrip,
  listTrip,
};
