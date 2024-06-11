const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los warrantys
const listWarranty = async (req, res) => {
  try {
    const warrantys = await prisma.warranty.findMany();
    res.status(200).json(warrantys);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las warrantys ${error}` });
  }
};

// Crear un nuevo warranty
const createWarranty = async (req, res) => {
  const { vehicleId, start_date, end_date} = req.body;

  try {
    const newWarranty = await prisma.warranty.create({
      data: {
        vehicleId, start_date, end_date
      },
    });
    res.status(200).json(newWarranty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el warranty ${error}` });
  }
};

// Obtener un warranty por id vehiculo
const getWarranty = async (req, res) => {
  const { id } = req.params;
  try {
    const warranty = await prisma.warranty.findMany({
      where: { vehicleId: id },
    });
    if (!warranty) {
      return res.status(404).json({ error: `Warranty  no encontrado` });
    }
    res.status(200).json(warranty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Warranty ${error}` });
  }
};

// Actualizar un warranty por id
const editWarranty = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, start_date, end_date } = req.body;

  try {
    const updateData = {
      vehicleId, start_date, end_date
    };

    const warranty = await prisma.warranty.update({
      where: { vehicleId: id },
      data: updateData,
    });

    res.status(200).json(warranty);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la warranty : ${error.message}` });
  }
};

// Eliminar una warranty por id
const deleteWarranty = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.warranty.delete({
      where: { vehicleId: id },
    });
    res.status(200).json({ message: "warranty eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el warranty ${error}` });
  }
};

module.exports = {
  createWarranty,
  deleteWarranty,
  editWarranty,
  getWarranty,
  listWarranty,
};
