import { PATHS } from "../utils/config";

export class User {
  BASE_PATH = PATHS.BASE_PATH;
  USERS = PATHS.API_ROUTES.USERS;
  NEW_USERS = PATHS.API_ROUTES.NEW_USER;
  EDIT_USER = PATHS.API_ROUTES.EDIT_USER;

  createUser = async (formData) => {
    try {
      console.log("api", formData);
      const URL = `${this.BASE_PATH}/${this.NEW_USERS}`;
      console.log(URL);
      const params = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(URL, params);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };
  
  getUsers = async () => {
    try {
      const URL = `${this.BASE_PATH}/${this.USERS}`;
      console.log(URL);
      const response = await fetch(URL);
      const users = await response.json();
      return users; 
    } catch (error) {
      console.error(error);
    }
  };

  getUserById = async (userId) => {
    try {
      const URL = `${this.BASE_PATH}/${this.USERS}/${userId}`;
      console.log(URL);
      const response = await fetch(URL);
      const user = await response.json();
      return user; 
    } catch (error) {
      console.error(error);
    }
  };

  editUserById = async (userId, updatedData) => {
    try {
      const URL = `${this.BASE_PATH}/${this.EDIT_USER}/${userId}`;
      console.log(URL);
      const params = {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      };
      const response = await fetch(URL, params);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  deleteUserById = async (userId) => {
    try {
      const URL = `${this.BASE_PATH}/${this.USERS}/delete/${userId}`;
      console.log(URL);
      const params = {
        method: "DELETE",
      };
      const response = await fetch(URL, params);
      const message = await response.text(); // Convert response to text
      console.log(message);
      return message; 
    } catch (error) {
      console.error(error);
    }
  };
}