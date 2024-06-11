import { PATHS } from "../utils/config";

export class User {
  BASE_PATH = PATHS.BASE_PATH;
  USERS = PATHS.API_ROUTES.USERS;
  NEW_USERS = PATHS.API_ROUTES.NEW_USER;
  EDIT_USER = PATHS.API_ROUTES.EDIT_USER;

  createUser = async (formData) => {
    try {
      const URL = `${this.BASE_PATH}/${this.NEW_USERS}`;
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
  
  getUsers = async () => {
    try {
      const URL = `${this.BASE_PATH}${this.USERS}`;
      const response = await fetch(URL);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  getUserById = async (userId) => {
    try {
      const URL = `${this.BASE_PATH}/${this.USERS}/${userId}`;
      const response = await fetch(URL);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  editUserById = async (userId, updatedData) => {
    try {
      const URL = `${this.BASE_PATH}${this.EDIT_USER}/${userId}`;
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

  deleteUserById = async (userId) => {
    try {
      const URL = `${this.BASE_PATH}${this.USERS}/delete/${userId}`;
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
