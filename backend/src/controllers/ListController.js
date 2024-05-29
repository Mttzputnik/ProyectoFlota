const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los lists
const listList = async (req, res) => {
  try {
    const lists = await prisma.list.findMany();
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las lists ${error}` });
  }
};

// Crear un nuevo list
const createList = async (req, res) => {
  const { name } = req.body;
  console.log("Received name:", name); // Esto te mostrará qué está recibiendo del cliente

  try {
    const newList = await prisma.list.create({
      data: {
        name
      },
    });
    res.status(200).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el list ${error}` });
  }
};

// Obtener un list por id
const getList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await prisma.list.findUnique({
      where: { id: id },
    });
    if (!list) {
      return res.status(404).json({ error: `List  no encontrado` });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la List ${error}` });
  }
};

// Actualizar un list por id
const editList = async (req, res) => {
  const { id } = req.params;
  const {name} = req.body;

  try {
    const updateData = {
        name
    };

    const list = await prisma.list.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la list : ${error.message}` });
  }
};

// Eliminar una list por id
const deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.list.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "list eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el list ${error}` });
  }
};

module.exports = {
  createList,
  deleteList,
  editList,
  getList,
  listList,
};
