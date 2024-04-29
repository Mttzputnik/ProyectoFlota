import { PATHS } from "../utils/config";

const baseApi = PATHS.BASE_PATH;
const newUserPath = PATHS.API_ROUTES.NEW_USER;
const UserPath = PATHS.API_ROUTES.USERS;

export class User {
    createUser = async (data) => {
        try {
            const FormData= new FormData();

            console.log(`${baseApi}${UserPath}`);
            const URL = `${baseApi}${UserPath}`;
            const params ={
                method: POST,
                body: FormData
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