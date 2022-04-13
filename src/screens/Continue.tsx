import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState} from '../reducers/game';
import BaseStyle from '../styles/base';
import {loadGames} from '../util';

type Props = NativeStackScreenProps<RootStackParamList, 'Continue'>;

const GameItem = ({
  player,
  started,
  onPress,
}: {
  player: string;
  started: Date;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      style={{minHeight: 50, flex: 1, justifyContent: 'center'}}
      onPress={onPress}>
      <Text style={{fontSize: 18}}>
        {player} - {started.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};

const Continue = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<gameState[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadGames()
        .then(games => {
          setGames(games);
          console.log(`loading ${games.length} games`);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  return (
    <View style={BaseStyle.container}>
      <Text style={BaseStyle.heading1}>Load Saved Game</Text>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={games}
          renderItem={({item}) => (
            <GameItem
              player={item.player}
              started={new Date(item.started)}
              onPress={() => {
                dispatch(setGame(item));
                navigation.navigate('GameDetail', {gameId: item.id});
              }}
            />
          )}
          ListEmptyComponent={<Text>No saved games.</Text>}
        />
      )}
    </View>
  );
};

export default Continue;
