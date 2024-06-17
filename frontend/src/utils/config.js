const SERVER_IP = 'http://localhost:3001';

export const PATHS = {
    BASE_PATH: `${SERVER_IP}`, 
    API_ROUTES: {
        USERS: '/users',
        NEW_USER: '/users/new-user',
        EDIT_USER: '/users/edit',
        DELETE_USER: '/users/delete',
        LIST_USER: '/users/list',

        VEHICLES: 'vehicles',
        LIST_VEHICLE: '/vehicles',
        NEW_VEHICLE: '/vehicles/new-vehicle',
        EDIT_VEHICLE: '/vehicles/edit',
        DELETE_VEHICLE: '/vehicles/delete',

        TRIPS: '/trips',
        LIST_TRIP: '/trips',
        NEW_TRIP: '/trips/new-trip',
        EDIT_TRIP: '/trips/edit',
        DELETE_TRIP: '/trips/delete',
        
    } 

}