const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los tires
const listTire = async (req, res) => {
  try {
    const tires = await prisma.tire.findMany();
    res.status(200).json(tires);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las tires ${error}` });
  }
};

// Crear un nuevo tire
const createTire = async (req, res) => {
  const { vehicleId, brand, model, installationDate, mileage, wear } = req.body;     


  try {
    const newTire = await prisma.tire.create({
      data: {
        vehicleId, brand, model, installationDate, mileage : parseInt(mileage), wear: parseFloat(wear)
      },
    });
    res.status(200).json(newTire);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el tire ${error}` });
  }
};

// Obtener un tire por id
const getTire = async (req, res) => {
  const { id } = req.params;
  try {
    const tire = await prisma.tire.findUnique({
      where: { id: id },
    });
    if (!tire) {
      return res.status(404).json({ error: `Tire  no encontrado` });
    }
    res.status(200).json(tire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Tire ${error}` });
  }
};

// Actualizar un tire por id
const editTire = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, brand, model, installationDate, mileage, wear } = req.body;

  try {
    const updateData = {
      vehicleId, brand, model, installationDate, mileage, wear
    };

    const tire = await prisma.tire.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(tire);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la tire : ${error.message}` });
  }
};

// Eliminar una tire por id
const deleteTire = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tire.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "tire eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el tire ${error}` });
  }
};

module.exports = {
  createTire,
  deleteTire,
  editTire,
  getTire,
  listTire,
};
