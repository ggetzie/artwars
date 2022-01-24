import {combineReducers} from 'redux';
import gameReducer from './game';
import settingsReducer from './settings';

export default combineReducers({
  game: gameReducer,
  settings: settingsReducer,
});
