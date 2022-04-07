import Home from './Home';
import Settings from './Settings';
import NewGame from './NewGame';
import About from './About';
import Game from './game/';
import Continue from './Continue';
import GameDetail from './GameDetail';
import GameOver from './GameOver';
import HighScores from './HighScores';

export type RootStackParamList = {
  Home: undefined;
  Continue: undefined;
  GameDetail: {gameId: string};
  Settings: undefined;
  NewGame: undefined;
  About: undefined;
  Game: undefined;
  GameOver: undefined;
  HighScores: undefined;
};

export {
  Home,
  Settings,
  NewGame,
  About,
  Game,
  Continue,
  GameDetail,
  GameOver,
  HighScores,
};
