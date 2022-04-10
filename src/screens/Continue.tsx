import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState} from '../reducers/game';
import BaseStyle from '../styles/base';
import {loadGames} from '../util/persist';

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
    <TouchableOpacity style={GameItemStyle.container} onPress={onPress}>
      <Text style={GameItemStyle.text}>
        {player} - {started.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};

const GameItemStyle = StyleSheet.create({
  container: {
    minHeight: 50,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

const Continue = (_: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<gameState[]>([]);
  const linkTo = useLinkTo();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadGames()
        .then(gameList => {
          setGames(gameList);
          console.log(`loading ${gameList.length} games`);
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
                linkTo(`/continue/${item.id}/`);
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
