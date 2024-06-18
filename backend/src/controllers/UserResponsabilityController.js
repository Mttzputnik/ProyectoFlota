const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los userResponsabilitys
const listUserResponsability = async (req, res) => {
  try {
    const userResponsabilitys = await prisma.userResponsability.findMany();
    res.status(200).json(userResponsabilitys);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las relaciones del usuario ${error}` });
  }
};

// Crear un nuevo userResponsability
const createUserResponsability = async (req, res) => {
  const {vehicleId,userId, estado} = req.body;     
  try {
    const newUserResponsability = await prisma.userResponsability.create({
      data: {
        vehicleId,userId, estado
      },
    });
    res.status(200).json(newUserResponsability);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear la relacion ${error}` });
  }
};

// Obtener un userResponsability por id
const getUserResponsability = async (req, res) => {
  const { id } = req.params;
  try {
    const userResponsability = await prisma.userResponsability.findUnique({
      where: { id: id },
    });
    if (!userResponsability) {
      return res.status(404).json({ error: `Relacion no encontrada` });
    }
    res.status(200).json(userResponsability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la responsabilidad del usuario con vehiculos ${error}` });
  }
};

// Actualizar un userResponsability por id
const editUserResponsability = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const updateData = {
      estado
        };

    const userResponsability = await prisma.userResponsability.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(userResponsability);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la el estado de la responsabilidad : ${error.message}` });
  }
};

module.exports = {
  createUserResponsability,
  editUserResponsability,
  getUserResponsability,
  listUserResponsability,
};
