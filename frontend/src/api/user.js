import { PATHS } from "../utils/config"

export class User {
    baseApi = PATHS.BASE_PATH;
    newUsersPath = PATHS.API_ROUTES.NEW_USER;
    usersPath = PATHS.API_ROUTES.USERS;

    createUser = async (formData) => {
        
        try {
            console.log("api", formData);
            console.log(`${this.baseApi} ${PATHS.USER}`);
            const URL = `${this.baseApi}${this.newUsersPath}`
            const params =
                {
                    method: "POST",
                    body: formData
                };
            console.log(params);
            const response = await fetch(URL, params)
            console.log(response);
            const result = response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    }
    getUsers = async () => {
        try {
        } catch (error) {

        }
    }
    getUserById = async () => {
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
getUserByIdAndUpdate = async () => {
    try {

    } catch (error) {

    }
}


getUserByIdAndDelete = async () => {
    try {

    } catch (error) {

    }
}
