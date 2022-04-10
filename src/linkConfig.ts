import {CityName} from './util/types';
function numToString(a: number): string {
  return a.toString();
}
const config: any = {
  screens: {
    Home: '',
    NewGame: 'newgame/',
    Continue: 'continue/',
    GameDetail: 'continue/:gameId',
    Settings: 'settings/',
    About: 'about/',
    GameOver: 'gameover/',
    Game: {
      screens: {
        City: 'game/city/',
        Portfolio: {
          screens: {
            List: 'game/portfolio/',
            Detail: {
              path: 'game/portfolio/:artworkId/',
              parse: {artworkId: parseInt},
              stringify: {artworkId: numToString},
            },
            Confirm: {
              path: 'game/portfolio/:artworkId/:destination/',
              parse: {
                artworkId: parseInt,
                destination: (destination: string): CityName =>
                  destination as CityName,
              },
            },
          },
        },
        Collector: {
          screens: {
            List: 'game/collector/',
            Buy: {
              path: 'game/collector/buy/:artworkId',
              parse: {artworkId: parseInt},
              stringify: {artworkId: numToString},
            },
            SellSelect: 'game/collector/sell/',
            Sell: {
              path: 'game/collector/sell/:artworkId',
              parse: {artworkId: parseInt},
              stringify: {artworkId: numToString},
            },
          },
        },
        Auction: {
          screens: {
            List: 'game/auction/',
            Buy: {
              path: 'game/auction/buy/:artworkId/',
              parse: {artworkId: parseInt},
              stringify: {artworkId: numToString},
            },
            SellSelect: 'game/auction/sell/',
            Sell: {
              path: 'game/auction/sell/:artworkId/',
              parse: {artworkId: parseInt},
              stringify: {artworkId: numToString},
            },
          },
        },
        Shop: {
          screens: {
            List: 'game/shop/',
            Buy: 'game/shop/:name/',
          },
        },
      },
    },
  },
};

export default config;
