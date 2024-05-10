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
    }
    getUsers = async () => {
        try {

        } catch (error) {

        }
    }
    getUserById = async () => {
        try {

        } catch (error) {

        }
    }

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
}