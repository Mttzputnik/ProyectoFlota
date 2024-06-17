import { PATHS } from "../utils/config";

export class Trip {
  BASE_PATH = PATHS.BASE_PATH;
  TRIPS = PATHS.API_ROUTES.TRIPS;
  NEW_TRIP = PATHS.API_ROUTES.NEW_TRIP;
  EDIT_TRIP = PATHS.API_ROUTES.EDIT_TRIP;

createTrip = async (formData) => {
  try {
    const URL = `${this.BASE_PATH}${this.NEW_TRIP}`;
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

getTrips = async () => {
  try {
    const URL = `${this.BASE_PATH}${this.TRIPS}`;
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

getTripById = async (tripId) => {
  try {
    const URL = `${this.BASE_PATH}/${this.TRIPS}/${tripId}`;
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

editTripById = async (tripId, updatedData) => {
  try {
    const URL = `${this.BASE_PATH}${this.EDIT_TRIP}/${tripId}`;
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

deleteTripById = async (tripId) => {
  try {
    const URL = `${this.BASE_PATH}${this.TRIPS}/delete/${tripId}`;
    const params = {
      method: "DELETE",
    };
    const response = await fetch(URL, params);
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}
}
