import React, {useState} from 'react';
import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, portfolioValue} from '../reducers/game';
import BaseStyle from '../styles/base';
import {deleteGame, loadGame} from '../util/persist';
import {gameState} from '../reducers/game';

type Props = NativeStackScreenProps<RootStackParamList, 'GameDetail'>;

const GameInfo = ({
  game,
  onConfirm,
  onDelete,
}: {
  game: gameState;
  onConfirm: (event: GestureResponderEvent) => void;
  onDelete: (event: GestureResponderEvent) => void;
}) => {
  return (
    <>
      <Text>{game.player}</Text>
      <Text>Started: {new Date(game.started).toLocaleString()}</Text>
      <Text>
        Turn {game.turn} of {game.maxTurns}
      </Text>
      <Text>Balance: ${game.balance.toLocaleString()}</Text>
      <Text>Portfolio Value: ${portfolioValue(game).toLocaleString()}</Text>
      <View style={[BaseStyle.buttonRow, GameInfoStyle.row]}>
        <TouchableOpacity
          style={[BaseStyle.button, BaseStyle.dangerButton]}
          onPress={onDelete}>
          <Text style={[BaseStyle.buttonText, BaseStyle.whiteText]}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BaseStyle.button, BaseStyle.successButton]}
          onPress={onConfirm}>
          <Text style={[BaseStyle.buttonText, BaseStyle.whiteText]}>Load</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const GameInfoStyle = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
  },
});

const GameDetail = ({route}: Props) => {
  const dispatch = useAppDispatch();
  const linkTo = useLinkTo();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedGame, setLoadedGame] = useState<gameState[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadGame(route.params.gameId)
        .then(game => {
          setLoadedGame([game]);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, [route.params.gameId]),
  );

  return (
    <View style={BaseStyle.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        [
          loadedGame.map(g => (
            <GameInfo
              key={g.id}
              game={g}
              onConfirm={() => {
                dispatch(setGame(loadedGame[0]));
                linkTo('/game/city/');
              }}
              onDelete={() => {
                deleteGame(g.id).then(() => linkTo('/continue/'));
              }}
            />
          )),
        ]
      )}
    </View>
  );
};

export default GameDetail;
