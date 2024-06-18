import { PATHS } from "../utils/config";

export class List {
    BASE_PATH = PATHS.BASE_PATH;
    LIST = PATHS.API_ROUTES.LIST;
    NEW_LIST = PATHS.API_ROUTES.NEW_LIST;
    EDIT_LIST = PATHS.API_ROUTES.EDIT_LIST;

    createList = async (formData) => {
        try {
            const URL = `${this.BASE_PATH}${this.NEW_LIST}`;
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
    }

    getLists = async () => {
        try {
            const URL = `${this.BASE_PATH}${this.LIST}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    getListById = async (listId) => {
        try {
            const URL = `${this.BASE_PATH}${this.LIST}/${listId}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    editListById = async (listId, updatedData) => {
        try {
            const URL = `${this.BASE_PATH}${this.EDIT_LIST}/${listId}`;
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
    }

    deleteListById = async (listId) => {
        try {
            const URL = `${this.BASE_PATH}${this.LIST}/${listId}`;
            const params = {
                method: "DELETE",
            };
            const response = await fetch(URL, params);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}

