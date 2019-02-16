import React from 'react';
import Strava from './Strava';
import {StravaContext} from '../../contexts/StravaContext';

export default () => (
    <StravaContext.Consumer>
        {({token, refreshToken}) => (
            <Strava
                token={token}
                refreshToken={refreshToken}
            />
        )}
    </StravaContext.Consumer>
);
