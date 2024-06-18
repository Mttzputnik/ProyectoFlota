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

        TASKS: '/tasks',
        LIST_TASK: '/tasks',
        NEW_TASK: '/tasks/new-task',
        EDIT_TASK: '/tasks/edit',
        DELETE_TASK: '/tasks/delete',
        
        LIST: '/lists',
        LIST_LIST: '/lists',
        NEW_LIST: '/lists/new-list',
        EDIT_LIST: '/lists/edit',
        DELETE_LIST: '/lists/delete',

        NEW_OPTIMIZED_ROUTE: 'optimizedRoute/new-optimizedRoute',
        CALCULATE_OPTIMIZED_ROUTE: '/optimizedRoute/calculate',
        LIST_OPTIMIZED_ROUTE: '/optimizedRoute',
        GET_OPTIMIZED_ROUTE: '/optimizedRoute/:id',
        EDIT_OPTIMIZED_ROUTE: '/optimizedRoute/edit/:id',
        DELETE_OPTIMIZED_ROUTE: '/optimizedRoute/delete/:id',

        MAINTENANCE: '/maintenances',
        NEW_MAINTENANCE: '/maintenances/new-maintenance',
        EDIT_MAINTENANCE: '/maintenances/edit',
        DELETE_MAINTENANCE: '/maintenances/delete',
        LIST_MAINTENANCE: '/maintenances',
        GET_MAINTENANCE: '/maintenances/:id',
        

        TIRES: '/tire',
        NEW_TIRE: '/tire/new-tire',
        EDIT_TIRE: '/tire/edit',
        DELETE_TIRE: '/tire/delete',
        LIST_TIRE: '/tire',
        GET_TIRE: '/tire/:id',

        WARRANTY: '/warranty',
        NEW_WARRANTY: '/warranty/new-warranty',
        EDIT_WARRANTY: '/warranty/edit',
        DELETE_WARRANTY: '/warranty/delete',
        LIST_WARRANTY: '/warranty',
        GET_WARRANTY: '/warranty/:id',
    } 

}