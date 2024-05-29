const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los optimizedRoutes
const listOptimizedRoute = async (req, res) => {
  try {
    const optimizedRoutes = await prisma.optimizedRoute.findMany();
    res.status(200).json(optimizedRoutes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las optimizedRoutes ${error}` });
  }
};

// Crear un nuevo optimizedRoute
const createOptimizedRoute = async (req, res) => {
  const { tripId, pointsOfInterest, totalDistance, estimatedDuration } = req.body;     

  
  try {
    const newOptimizedRoute = await prisma.optimizedRoute.create({
      data: {
        tripId, pointsOfInterest, totalDistance, estimatedDuration
      },
    });
    res.status(200).json(newOptimizedRoute);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el optimizedRoute ${error}` });
  }
};

// Obtener un optimizedRoute por id
const getOptimizedRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const optimizedRoute = await prisma.optimizedRoute.findUnique({
      where: { id: id },
    });
    if (!optimizedRoute) {
      return res.status(404).json({ error: `OptimizedRoute  no encontrado` });
    }
    res.status(200).json(optimizedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la OptimizedRoute ${error}` });
  }
};

// Actualizar un optimizedRoute por id
const editOptimizedRoute = async (req, res) => {
  const { id } = req.params;
  const { tripId, pointsOfInterest, totalDistance, estimatedDuration } = req.body;

  try {
    const updateData = {
      tripId, pointsOfInterest, totalDistance, estimatedDuration
    };

    const optimizedRoute = await prisma.optimizedRoute.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(optimizedRoute);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la optimizedRoute : ${error.message}` });
  }
};

// Eliminar una optimizedRoute por id
const deleteOptimizedRoute = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.optimizedRoute.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "optimizedRoute eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el optimizedRoute ${error}` });
  }
};

module.exports = {
  createOptimizedRoute,
  deleteOptimizedRoute,
  editOptimizedRoute,
  getOptimizedRoute,
  listOptimizedRoute,
};
