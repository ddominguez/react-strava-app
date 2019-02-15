import React from 'react';
import Strava from './Strava';
import {StravaContext} from '../../contexts/StravaContext';

export default () => (
    <StravaContext.Consumer>
        {({token, refreshToken, user}) => (
            <Strava
                token={token}
                refreshToken={refreshToken}
                user={user}
            />
        )}
    </StravaContext.Consumer>
);
