const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userController = {
    
  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios.' + error });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    const { email, user_name, lastname, avatar, active_user, current_password } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          user_name,
          lastname,
          avatar,
          active_user,
          current_password
        }
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario.' + error });
    }
  },

  // Obtener un usuario por su ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' + error});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario.' + error });
    }
  },

  // Actualizar un usuario por su ID
  updateUserById: async (req, res) => {
    const { id } = req.params;
    const { email, user_name, lastname, avatar, active_user, current_password } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          email,
          user_name,
          lastname,
          avatar,
          active_user,
          current_password
        }
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario.' + error});
    }
  },

  // Eliminar un usuario por su ID
  deleteUserById: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: {
          id
        }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario.' + error });
    }
  }
};

module.exports = userController;
