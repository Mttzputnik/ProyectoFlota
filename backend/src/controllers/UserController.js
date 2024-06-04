const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los user
const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todos los usuarios ${error}` });
  }
};

// Crear un nuevo user
const createUser = async (req, res) => {
  const { email, user_name, last_name, active_user, current_password, role } =
    req.body;
  const avatar = req.file ? req.file.filename : "default-avatar.png"; // Si no se proporciona un avatar, usa 'default-avatar.jpg'
  console.log(`Archivo de imagen: ${avatar}`);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        user_name,
        last_name,
        avatar,
        active_user: active_user === "true", // Convertir string a boolean
        current_password,
        role,
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el usuario ${error}` });
  }
};

// Obtener un user por id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({ error: `Usuario no encontrado` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener el usuario ${error}` });
  }
};

// Actualizar un user por id
const editUser = async (req, res) => {
  const { id } = req.params;
  const { email, user_name, last_name, active_user, current_password, role } =
    req.body;
  const avatar = req.file ? req.file.filename : null;

  console.log("Archivo recibido:", req.file);
  console.log("Datos recibidos:", req.body);

  try {
    const updateData = {
      email,
      user_name,
      last_name,
      active_user: active_user === "true",
      current_password,
      role,
    };

    if (avatar) {
      updateData.avatar = avatar;
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar el usuario: ${error.message}` });
  }
};

// Eliminar un user por id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el usuario ${error}` });
  }
};

module.exports = {
  createUser,
  deleteUser,
  editUser,
  getUser,
  listUsers,
};
