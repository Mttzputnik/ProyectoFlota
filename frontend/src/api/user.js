import { PATHS } from "../utils/config";
const baseApi = PATHS.BASE_PATH;
const UserPath = PATHS.API_ROUTES.USERS;
const newUserPath = PATHS.API_ROUTES.NEW_USER;

export class User {
    createUser = async (existingFormData) => {
        try {
            console.log("api",existingFormData)
            const formData= new FormData();

            console.log(`${baseApi}${newUserPath}`);
            const URL = `${baseApi}${newUserPath}`;
            console.log(URL);
            const params ={
                method: 'POST',
                body: existingFormData
            };
            console.log(params);
            const response = await fetch(URL,params);      
            console.log(response);
            const result =response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    getUsers = async() => {
        try {
            const URL = `${this.BASE_PATH}/${this.UserPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const users = response.json();
            return users;
          } catch (error) {
            console.error(error);
          }
        };

    getUsersById = async(userId) => {
        try {
            const URL = `${this.BASE_PATH}/${this.USERS}/${userId}`;
            console.log(URL);
            const response = await fetch(URL);
            const user = response.json();
            return user;
    } catch (error) {
        console.error(error);
    }};

    editUsersById = async(userId, FormData) => {
        try {
            const URL = `${this.BASE_PATH}/${this.USERS}/${userId}`;
            console.log(URL);
            const params = {
                method: 'PUT',
                body: JSON.stringify(FormData),
            };
            const response = await fetch(URL, params);
            const result =await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    deleteUsersById = async(userId) => {
        try {
            const URL = `${this.BASE_PATH}/${this.USERS}/${userId}`;
            console.log(URL);
            const params = {
                method: 'DELETE',
            };
            const response = await fetch(URL, params);
            const message =await response.text();
            console.log(message);
            return message;
        } catch (error) {
            console.error(error);
        }
    };

    getUsersByIdAndUpdate = async() => {
        try {
        
    } catch (error) {
        
    }}

    getUsersByIdAndDelete = async() => {
        try {
        
    } catch (error) {
        
    }}
}