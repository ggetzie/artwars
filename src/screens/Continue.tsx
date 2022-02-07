import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState} from '../reducers/game';
import BaseStyle from '../styles/base';
import {loadGames} from '../util';

type Props = NativeStackScreenProps<RootStackParamList, 'Continue'>;

const Continue = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<gameState[]>([]);

  useEffect(() => {
    loadGames()
      .then(games => {
        setGames(games);
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
            <Text>
              {item.player} - {item.started}
            </Text>
          )}
          ListEmptyComponent={<Text>No saved games.</Text>}
        />
      )}
    </View>
  );
};

export default Continue;
