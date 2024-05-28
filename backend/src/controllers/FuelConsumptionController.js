const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los fuelConsumptions
const listFuelConsumption = async (req, res) => {
  try {
    const fuelConsumptions = await prisma.fuelConsumption.findMany();
    res.status(200).json(fuelConsumptions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las fuelConsumptions ${error}` });
  }
};

// Crear un nuevo fuelConsumption
const createFuelConsumption = async (req, res) => {
  const { vehicleId, date, quantity, cost, efficiency } = req.body;     

  
  try {
    const newFuelConsumption = await prisma.fuelConsumption.create({
      data: {
        vehicleId, date, quantity, cost, efficiency
      },
    });
    res.status(200).json(newFuelConsumption);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el fuelConsumption ${error}` });
  }
};

// Obtener un fuelConsumption por id
const getFuelConsumption = async (req, res) => {
  const { id } = req.params;
  try {
    const fuelConsumption = await prisma.fuelConsumption.findUnique({
      where: { id: id },
    });
    if (!fuelConsumption) {
      return res.status(404).json({ error: `FuelConsumption  no encontrado` });
    }
    res.status(200).json(fuelConsumption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la FuelConsumption ${error}` });
  }
};

// Actualizar un fuelConsumption por id
const editFuelConsumption = async (req, res) => {
  const { id } = req.params;
  const {vehicleId, date, quantity, cost, efficiency} = req.body;

  try {
    const updateData = {
      vehicleId, date, quantity, cost, efficiency
    };

    const fuelConsumption = await prisma.fuelConsumption.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(fuelConsumption);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la fuelConsumption : ${error.message}` });
  }
};

// Eliminar una fuelConsumption por id
const deleteFuelConsumption = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.fuelConsumption.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "fuelConsumption eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el fuelConsumption ${error}` });
  }
};

module.exports = {
  createFuelConsumption,
  deleteFuelConsumption,
  editFuelConsumption,
  getFuelConsumption,
  listFuelConsumption,
};
