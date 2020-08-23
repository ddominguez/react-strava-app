import React from 'react';

const StaticMap = (props) => {
    const {mapType, name, polyline} = props;
    const mapBoxToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!polyline) {
        console.debug('StaticMap is missing map polyline.');
        return null;
    }
    const mapPolyline = encodeURIComponent(props.polyline);
    let imgSrc;
    switch(mapType) {
        case 'mapbox':
            imgSrc = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/path-2+f44-0.5(${mapPolyline})/auto/640x300@2x?logo=false&access_token=${mapBoxToken}`;
            break;
        case 'google':
        default:
            imgSrc = `https://maps.googleapis.com/maps/api/staticmap?scale=2&size=640x300&path=enc:${mapPolyline}&key=${googleMapsKey}`;
            break;
    }
    return (<img alt={name} src={imgSrc} />);
};

export { StaticMap }
