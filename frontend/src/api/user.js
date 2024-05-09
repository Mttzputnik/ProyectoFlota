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