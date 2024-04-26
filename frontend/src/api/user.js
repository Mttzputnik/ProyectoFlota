import { PATHS } from "../utils/config";

export class User {
    baseApi = PATHS.BASE_PATH;
    newUserPath = PATHS.API_ROUTES.NEW_USER;
    UserPath = PATHS.API_ROUTES.USER;

    createUser = async () => {
        try {
            console.log(`${this.baseApi}${userPath}`);
            const response = await fetch(`${this.baseApi}${userPath}`,
            {
                method: POST,
                body: FormData
            }
        )
            console.log(response);
        } catch (error) {
            
        }
    }

    getUsers = async() => {
        try {
            
        } catch (error) {
            
        }
    }

    getUsersById = async() => {
        try {
        
    } catch (error) {
        
    }}

    getUsersByIdAndUpdate = async() => {
        try {
        
    } catch (error) {
        
    }}

    getUsersByIdAndDelete = async() => {
        try {
        
    } catch (error) {
        
    }}
}