const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los documents
const listDocument = async (req, res) => {
  try {
    const documents = await prisma.document.findMany();
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las documents ${error}` });
  }
};

// Crear un nuevo document
const createDocument = async (req, res) => {
  const { vehicleId, type, documentName, expirationDate } = req.body;     


  try {
    const newDocument = await prisma.document.create({
      data: {
        vehicleId, type, documentName, expirationDate
      },
    });
    res.status(200).json(newDocument);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el document ${error}` });
  }
};

// Obtener un document por id
const getDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await prisma.document.findUnique({
      where: { id: id },
    });
    if (!document) {
      return res.status(404).json({ error: `Document  no encontrado` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Document ${error}` });
  }
};

// Actualizar un document por id
const editDocument = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, type, documentName, expirationDate } = req.body;

  try {
    const updateData = {
      vehicleId, type, documentName, expirationDate
    };

    const document = await prisma.document.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la document : ${error.message}` });
  }
};

// Eliminar una document por id
const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.document.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "document eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el document ${error}` });
  }
};

module.exports = {
  createDocument,
  deleteDocument,
  editDocument,
  getDocument,
  listDocument,
};
