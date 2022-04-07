import {gameState} from '../reducers/game';
import {HighScore} from './types';
const GAME_KEY = 'artwars_SavedGames';
const HS_KEY = 'artwars_HighScores';

async function saveGame(game: gameState) {
  if (typeof window !== undefined) {
    const games = await loadGames();
    const res = games.filter(s => s.id !== game.id); // replace previous save, if it exists
    window.localStorage.setItem(GAME_KEY, JSON.stringify(res.concat(game)));
    return new Promise<void>((resolve, _) => resolve());
  }
  throw 'window undefined! - saveGame';
}

async function deleteGame(gameId: string) {
  if (typeof window !== undefined) {
    const games = await loadGames();
    window.localStorage.setItem(
      GAME_KEY,
      JSON.stringify(games.filter(g => g.id !== gameId)),
    );
  }
  throw 'window undefined! - deleteGame';
}

async function loadGames(): Promise<gameState[]> {
  if (typeof window !== undefined) {
    const games = window.localStorage.get(GAME_KEY);
    const res = games ? JSON.parse(games) : [];
    return new Promise((resolve, _) => resolve(res));
  }
  throw 'window undefined! - loadGames';
}

async function loadGame(gameId: string): Promise<gameState> {
  if (typeof window !== undefined) {
    const games = window.localStorage.get(GAME_KEY);
    for (const game of games) {
      if (game.id === gameId) {
        return new Promise((resolve, _) => resolve(game));
      }
    }
    throw `Game not found: ${gameId}`;
  }
  throw 'window undefined! - loadGame';
}

async function saveHighScores(scores: HighScore[]) {
  if (typeof window !== undefined) {
    window.localStorage.setItem(HS_KEY, JSON.stringify(scores));
    return new Promise<void>((resolve, _) => resolve());
  }
  throw 'window undefined! - saveHighScores';
}

async function loadHighScores(): Promise<HighScore[]> {
  if (typeof window !== undefined) {
    const scores = window.localStorage.getItem(HS_KEY) || '[]';
    return new Promise((resolve, _) => resolve(JSON.parse(scores)));
  }
  throw 'window undefined! - loadHighScores';
}

export {
  saveGame,
  deleteGame,
  loadGame,
  loadGames,
  saveHighScores,
  loadHighScores,
};
