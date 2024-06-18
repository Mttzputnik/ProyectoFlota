import { PATHS } from "../utils/config";


export class Maintenance {
    BASE_PATH = PATHS.BASE_PATH;
    MAINTENANCE = PATHS.API_ROUTES.MAINTENANCE;
    NEW_MAINTENANCE = PATHS.API_ROUTES.NEW_MAINTENANCE;
    EDIT_MAINTENANCE = PATHS.API_ROUTES.EDIT_MAINTENANCE;

    createMaintenance = async (formData) => {
        try {
            const URL = `${this.BASE_PATH}${this.NEW_MAINTENANCE}`;
            const params = {
                method: "POST",
                body: formData,
            };
            const response = await fetch(URL, params);
            return await response.json();
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    getMaintenances = async () => {
        try {
            const URL = `${this.BASE_PATH}${this.MAINTENANCE}`;
            const response = await fetch(URL);
            return await response.json();
        }
        catch (error) {
            console.error(error);
        }
    }

    getMaintenanceById = async (maintenanceId) => {
        try {

            const URL = `${this.BASE_PATH}${this.MAINTENANCE}/${maintenanceId}`;
            const response = await fetch(URL);
            return await response.json();
        }
        catch (error) {
            console.error(error);
        }
    }

    editMaintenanceById = async (maintenanceId, updatedData) => {
        try {
            const URL = `${this.BASE_PATH}${this.EDIT_MAINTENANCE}/${maintenanceId}`;
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
        }
        catch (error) {
            console.error(error);
        }
    }

    deleteMaintenanceById = async (maintenanceId) => {
        try {
            const URL = `${this.BASE_PATH}${this.MAINTENANCE}/${maintenanceId}`;
            const params = {
                method: "DELETE",
            };
            const response = await fetch(URL, params);
            return await response.json();
        }

        catch (error) {
            console.error(error);
        }
    }
}

