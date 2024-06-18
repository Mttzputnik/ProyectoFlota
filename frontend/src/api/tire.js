import { PATHS } from "../utils/config";

export class Tire {
    BASE_PATH = PATHS.BASE_PATH;
    TIRES = PATHS.API_ROUTES.TIRES;
    NEW_TIRE = PATHS.API_ROUTES.NEW_TIRE;
    EDIT_TIRE = PATHS.API_ROUTES.EDIT_TIRE;

    createTire = async (formData) => {
        try {
            const URL = `${this.BASE_PATH}${this.NEW_TIRE}`;
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

    getTires = async () => {
        try {
            const URL = `${this.BASE_PATH}${this.TIRES}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    getTireById = async (tireId) => {
        try {
            const URL = `${this.BASE_PATH}${this.TIRES}/${tireId}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    editTireById = async (tireId, updatedData) => {
        try {
            const URL = `${this.BASE_PATH}${this.EDIT_TIRE}/${tireId}`;
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

    deleteTireById = async (tireId) => {
        try {
            const URL = `${this.BASE_PATH}${this.TIRES}/delete/${tireId}`;
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
