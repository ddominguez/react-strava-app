This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Info

This is a simple react front-end that does the following:

* Initiates Strava's OAuth workflow
* Request and store an access token from Strava via web server
* Use access token to request 10 latest activities from Strava

## Setup

Clone https://github.com/ddominguez/flask-strava and follow directions to setup and start flask app.

Create .env.local file in root directory and add the following variables. In this example, the URIs are the endpoints are from the flask app.

```
REACT_APP_AUTH_URI = 'http://localhost:5000/strava_authorize'
REACT_APP_TOKEN_URI = 'http://localhost:5000/strava_token'
REACT_APP_GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'
```

Start react app

```
yarn start
```
