import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState, portfolioValue} from '../reducers/game';
import BaseStyle from '../styles/base';
import {deleteGame, loadGame} from '../util/persist';

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

const GameDetail = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
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
                navigation.navigate('Game');
              }}
              onDelete={() => {
                deleteGame(g.id).then(() => navigation.navigate('Continue'));
              }}
            />
          )),
        ]
      )}
    </View>
  );
};

export default GameDetail;
