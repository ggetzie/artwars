import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../../hooks';
import {
  filterArtWorks,
  selectCity,
  selectNPC,
  // selectPlayer,
} from '../../reducers/game';
import {RootStackParamList} from '..';
import {ArtWorkFilter} from '../../util/awFilter';
import {ArtWork} from '../../util';

type Props = NativeStackScreenProps<RootStackParamList, 'YourArt'>;

const ArtItem = ({artwork}: {artwork: ArtWork}) => {
  return (
    <View>
      <Text>{artwork.title}</Text>
      <Text>{artwork.artist}</Text>
      <Text>{artwork.value}</Text>
      <Button title="Buy" />
    </View>
  );
};

const Collector = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const npc = selectNPC(game, city);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.name}),
  );
  // const player = selectPlayer(game);
  return (
    <View>
      <View>
        <Text>{npc.name}</Text>
        <Text>Likes: {npc.preference}</Text>
      </View>
      <View>
        <Text>Collection</Text>
        <FlatList
          data={artworks}
          renderItem={item => <ArtItem artwork={item.item} />}
        />
      </View>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Collector;
