import { PATHS } from "../utils/config";

export class Task {
    BASE_PATH = PATHS.BASE_PATH;
    TASKS = PATHS.API_ROUTES.TASKS;
    NEW_TASK = PATHS.API_ROUTES.NEW_TASK;
    EDIT_TASK = PATHS.API_ROUTES.EDIT_TASK;

    createTask = async (formData) => {
        try {
            const URL = `${this.BASE_PATH}${this.NEW_TASK}`;
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

    getTasks = async () => {
        try {
            const URL = `${this.BASE_PATH}${this.TASKS}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    getTaskById = async (taskId) => {
        try {
            const URL = `${this.BASE_PATH}${this.TASKS}/${taskId}`;
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    editTaskById = async (taskId, updatedData) => {
        try {
            const URL = `${this.BASE_PATH}${this.EDIT_TASK}/${taskId}`;
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

    deleteTaskById = async (taskId) => {
        try {
            const URL = `${this.BASE_PATH}${this.TASKS}/${taskId}`;
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
