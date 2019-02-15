import React from 'react';
import StravaRedirect from './StravaRedirect';
import {StravaContext} from '../../contexts/StravaContext';

export default () => (
    <StravaContext.Consumer>
        {({handleTokenUpdate}) => (
            <StravaRedirect
                handleTokenUpdate={handleTokenUpdate}
            />
        )}
    </StravaContext.Consumer>
);
