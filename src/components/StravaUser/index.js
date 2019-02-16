import React from 'react';
import StravaUser from './StravaUser';
import {StravaContext} from '../../contexts/StravaContext';

export default () => (
    <StravaContext.Consumer>
        {({user}) => (
            <StravaUser
                user={user}
            />
        )}
    </StravaContext.Consumer>
);