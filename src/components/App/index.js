import React from 'react';
import App from './App';
import {StravaContext} from '../../contexts/StravaContext';

export default () => (
    <StravaContext.Consumer>
        {({token, refreshToken}) => (
            <App
                token={token}
                refreshToken={refreshToken}
            />
        )}
    </StravaContext.Consumer>
);
