import RNFS from 'react-native-fs';
import {gameState} from '../reducers/game';
import {HighScore} from './types';
const SAVE_PATH = RNFS.DocumentDirectoryPath + '/saved/';
const HS_PATH = RNFS.DocumentDirectoryPath + '/high_scores.json';
RNFS.mkdir(SAVE_PATH);

async function saveGame(game: gameState) {
  const path = SAVE_PATH + `${game.id}.json`;
  const start = new Date();
  console.log(`starting save ${start.valueOf()}`);
  const exists = await RNFS.exists(path);
  if (exists) {
    await RNFS.unlink(path);
  }
  await RNFS.writeFile(path, JSON.stringify(game), 'utf8')
    .then(() =>
      console.log(
        `saved game: ${path} in ${new Date().valueOf() - start.valueOf()}ms`,
      ),
    )
    .catch(error => console.log(error.message));
}

async function deleteGame(gameId: string) {
  const path = SAVE_PATH + `${gameId}.json`;
  await RNFS.unlink(path)
    .then(() => console.log(`Deleted ${path}`))
    .catch(_ => console.log(`Error deleting ${path}`));
}

async function loadGames(): Promise<gameState[]> {
  const files = await RNFS.readDir(SAVE_PATH).then(items => {
    return items.filter(f => f.isFile());
  });
  console.log(files.map(f => f.name));
  const games = files.map(async f => {
    const contents = await RNFS.readFile(f.path);
    const l = contents.length;
    console.log(contents.slice(l - 195, l));
    return JSON.parse(contents);
  });
  return Promise.all(games);
}

async function loadGame(gameId: string): Promise<gameState> {
  const filename = SAVE_PATH + `${gameId}.json`;
  const contents = await RNFS.readFile(filename, 'utf8');
  const game = JSON.parse(contents);
  return game;
}

async function saveHighScores(scores: HighScore[]) {
  const exists = await RNFS.exists(HS_PATH);
  if (exists) {
    await RNFS.unlink(HS_PATH);
  }
  await RNFS.writeFile(HS_PATH, JSON.stringify(scores), 'utf8');
  console.log('saved high scores');
}

async function loadHighScores(): Promise<HighScore[]> {
  const exists = await RNFS.exists(HS_PATH);
  if (exists) {
    const contents = await RNFS.readFile(HS_PATH, 'utf8');
    return JSON.parse(contents);
  } else {
    return [];
  }
}

export {
  saveGame,
  loadGame,
  loadGames,
  saveHighScores,
  loadHighScores,
  deleteGame,
};
