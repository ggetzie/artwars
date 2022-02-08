import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
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
    <TouchableOpacity style={{minHeight: 50}} onPress={onPress}>
      <Text>
        {player} - {started.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};

const Continue = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<gameState[]>([]);

  useEffect(() => {
    loadGames()
      .then(games => {
        setGames(games);
        console.log(`loading ${games.length} games`);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

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
                navigation.navigate('Game');
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
