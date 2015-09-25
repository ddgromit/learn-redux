import countingApp from './countingApp';
import { routerStateReducer } from 'redux-router';
import { combineReducers } from 'redux';

export default combineReducers({
  counting: countingApp,
  router: routerStateReducer,
});
