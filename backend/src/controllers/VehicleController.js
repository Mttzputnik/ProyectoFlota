const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los vehicles
const listVehicle = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al obtener todas las vehicles ${error}` });
  }
};

// Crear un nuevo vehicle
const createVehicle = async (req, res) => {
  const { brand, model, year, fuelType, licensePlate, mileage, status } =
    req.body;
  const image = req.file ? req.file.filename : "default-vehicle.png"; // Si no se proporciona una imagen, usa 'default-vehicle.jpg'
  console.log(`Archivo de imagen: ${image}`);
  
  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        year: parseInt(year, 10),
        fuelType,
        licensePlate,
        mileage: parseInt(mileage, 10),
        status : status ? true : false,
      },
    });
    res.status(200).json(newVehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error al crear el vehicle ${error}` });
  }
};

// Obtener un vehicle por id
const getVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: id },
    });
    if (!vehicle) {
      return res.status(404).json({ error: `Vehicle  no encontrado` });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener la Vehicle ${error}` });
  }
};

// Actualizar un vehicle por id
const editVehicle = async (req, res) => {
  const { id } = req.params;
  const { brand, model, year, fuelType, licensePlate, mileage, status } =
    req.body;

  try {
    const updateData = {
      brand,
      model,
      year : parseInt(year, 10),
      fuelType,
      licensePlate,
      mileage : parseInt(mileage, 10),
      status : status ? true : false,
    };

    const vehicle = await prisma.vehicle.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(vehicle);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error al actualizar la vehicle : ${error.message}` });
  }
};

// Eliminar una vehicle por id
const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.vehicle.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "vehicle eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar el vehicle ${error}` });
  }
};

module.exports = {
  createVehicle,
  deleteVehicle,
  editVehicle,
  getVehicle,
  listVehicle,
};
