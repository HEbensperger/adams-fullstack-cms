import { FETCH_USER } from '../actions/types';

// create an auth reducer and export it
export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state; // the default state will be null
  }
}