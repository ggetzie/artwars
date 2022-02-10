import Home from './Home';
import Settings from './Settings';
import NewGame from './NewGame';
import About from './About';
import Game from './game/';
import Continue from './Continue';
import GameDetail from './GameDetail';
import {gameState} from '../reducers/game';

export type RootStackParamList = {
  Home: undefined;
  Continue: undefined;
  GameDetail: {game: gameState};
  Settings: undefined;
  NewGame: undefined;
  About: undefined;
  Game: undefined;
};

export {Home, Settings, NewGame, About, Game, Continue, GameDetail};
