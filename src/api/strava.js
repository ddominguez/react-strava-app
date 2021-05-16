import { STRAVA_TOKEN_URI } from "../constants";

export const fetchAuthorizedStravaUser = async (code) => {
    try {
        const response = await fetch(`${STRAVA_TOKEN_URI}?code=${code}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Unable to fetch authorized Strava user. ${error}`);
    }
};

export const fetchUserStravaActivities = async (token) => {
    try {
        const response = await fetch("https://www.strava.com/api/v3/activities?per_page=10", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Unable to fetch Strava activities. ${error}`);
    }
};
