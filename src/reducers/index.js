import { combineReducers } from 'redux';

import auth from './auth';
import article from './article';
import error from './error';

export default combineReducers({
    auth,
    article,
    error
})