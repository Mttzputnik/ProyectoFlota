import { PATHS } from "../utils/config";

export class Vehicle {
  BASE_PATH = PATHS.BASE_PATH;
  VEHICLES = PATHS.API_ROUTES.VEHICLES;
  NEW_VEHICLE = PATHS.API_ROUTES.NEW_VEHICLE;
  EDIT_VEHICLE = PATHS.API_ROUTES.EDIT_VEHICLE;
  WARRANTY = PATHS.API_ROUTES.WARRANTY;

  createVehicle = async (formData) => {
    try {
      const URL = `${this.BASE_PATH}${this.NEW_VEHICLE}`;
      const params = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(URL, params);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getVehicles = async () => {
    try {
      const URL = `${this.BASE_PATH}/${this.VEHICLES}`;
      const response = await fetch(URL);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  getVehicleById = async (vehicleId) => {
    try {
      const URL = `${this.BASE_PATH}/${this.VEHICLES}/${vehicleId}`;
      const response = await fetch(URL);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  editVehicleById = async (vehicleId, updatedData) => {
    try {
      const URL = `${this.BASE_PATH}${this.EDIT_VEHICLE}/${vehicleId}`;
      console.log("URL", URL);
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      const params = {
        method: "PATCH",
        body: formData,
      };

      const response = await fetch(URL, params);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  deleteVehicleById = async (vehicleId) => {
    try {
      const URL = `${this.BASE_PATH}/${this.VEHICLES}/delete/${vehicleId}`;
      const params = {
        method: "DELETE",
      };
      const response = await fetch(URL, params);
      return await response.text();
    } catch (error) {
      console.error(error);
    }
  };

  createWarranty = async (vehicleId, start_date, end_date) => {
    try {
      const URL = `${this.BASE_PATH}${this.WARRANTY}/new-warranty`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId, start_date, end_date }),
      };
      const response = await fetch(URL, params);
      return await response.json();
    } catch (error) {
      console.error("Error creating warranty:", error);
      throw error;
    }
  };

  getWarrantyByVehicleId = async (vehicleId) => {
    try {
      const URL = `${this.BASE_PATH}${this.WARRANTY}/${vehicleId}`;
      const response = await fetch(URL);
      return await response.json();
    } catch (error) {
      console.error(`Error getting warranty for vehicle with id ${vehicleId}:`, error);
      throw error;
    }
  };
}
