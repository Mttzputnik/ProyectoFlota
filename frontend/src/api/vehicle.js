import { PATHS } from "../utils/config";

export class Vehicle {
  BASE_PATH = PATHS.BASE_PATH;
  VEHICLES = PATHS.API_ROUTES.VEHICLES;
  NEW_VEHICLE = PATHS.API_ROUTES.NEW_VEHICLE;
  EDIT_VEHICLE = PATHS.API_ROUTES.EDIT_VEHICLE;

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
}
