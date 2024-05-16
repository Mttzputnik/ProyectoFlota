const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// obtener todos los usuarios
const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `error al obtener todos los usuarios ${error}` });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { email, user_name, last_name, active_user, current_password } =
    req.body;

  const avatar = req.file ? req.file.filename : null;
  console.log(`archivo de imagen: ${avatar}`);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        user_name,
        last_name,
        avatar,
        active_user: true,
        current_password,
        
      },
    });

    console.log(req.body);
    console.log(newUser);
    
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el usuario ${error}` });
  }
};

// obtener un usuario por id
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: `Usario no encontrado ${error}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Error al obtener el usuario ${error}`});
  }
};

// actualizar un usuario por id
const editUser = async (req, res) => {
  const { id } = req.params;
  const { email, user_name, last_name, active_user, current_password } =
    req.body;

  const avatar = req.file ? req.file.filename : null;
  console.log(avatar);

  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        email,
        user_name,
        last_name,
        avatar,
        active_user: true,
        current_password,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al actualizar el usuario ${error}`});
  }
};

// eliminar un usuario por id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.Users.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el usuario ${error}`});
  }
};



module.exports = {
  createUser,
  deleteUser,
  editUser,
  getUser,
  listUsers,
};
