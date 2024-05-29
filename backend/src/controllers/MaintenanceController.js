const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los maintenances
const listMaintenance = async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany();
    res.status(200).json(maintenances);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las maintenances ${error}` });
  }
};

// Crear un nuevo maintenance
const createMaintenance = async (req, res) => {
  const { vehicleId, type, date, description, cost, status } = req.body;

  


  try {
    const newMaintenance = await prisma.maintenance.create({
      data: {
        vehicleId, type, date, description, cost, status
      },
    });
    res.status(200).json(newMaintenance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el maintenance ${error}` });
  }
};

// Obtener un maintenance por id
const getMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    const maintenance = await prisma.maintenance.findUnique({
      where: { id: id },
    });
    if (!maintenance) {
      return res.status(404).json({ error: `Maintenance  no encontrado` });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Maintenance ${error}` });
  }
};

// Actualizar un maintenance por id
const editMaintenance = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, type, date, description, cost, status } = req.body;

  try {
    const updateData = {
      vehicleId, type, date, description, cost, status
    };

    const maintenance = await prisma.maintenance.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(maintenance);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la maintenance : ${error.message}` });
  }
};

// Eliminar una maintenance por id
const deleteMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.maintenance.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "maintenance eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el maintenance ${error}` });
  }
};

module.exports = {
  createMaintenance,
  deleteMaintenance,
  editMaintenance,
  getMaintenance,
  listMaintenance,
};
