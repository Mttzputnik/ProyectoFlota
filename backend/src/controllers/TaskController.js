const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los tasks
const listTask = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las tasks ${error}` });
  }
};

// Crear un nuevo task
const createTask = async (req, res) => {
  const { idUser, idList, desc } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        idUser,
        idList,
        desc
      },
    });
    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el task ${error}` });
  }
};

// Obtener un task por id
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: id },
    });
    if (!task) {
      return res.status(404).json({ error: `Task no encontrado` });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Task ${error}` });
  }
};

// Actualizar un task por id
const editTask = async (req, res) => {
  const { id } = req.params;
  const { idUser, idList, desc } = req.body;

  try {
    const updateData = {
      idUser,
      idList,
      desc,
    };

    const task = await prisma.task.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la task : ${error.message}` });
  }
};

// Eliminar una task por id
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "task eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el task ${error}` });
  }
};

module.exports = {
  createTask,
  deleteTask,
  editTask,
  getTask,
  listTask,
};
