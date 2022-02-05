import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState} from '../reducers/game';
import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'Continue'>;

const Continue = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const savedPath = RNFS.DocumentDirectoryPath + '/saved';
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);

  useEffect(() => {
    RNFS.readDir(savedPath)
      .then(items => setFiles(items.filter(f => f.isFile())))
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <Text style={BaseStyle.heading1}>Load Saved Game</Text>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={files}
          renderItem={({item}) => <Text>{item.name}</Text>}
          ListEmptyComponent={<Text>No saved games.</Text>}
        />
      )}
    </View>
  );
};

export default Continue;
