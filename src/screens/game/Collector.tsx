import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';

import {useAppSelector} from '../../hooks';
import {
  filterArtWorks,
  selectCity,
  selectNPC,
  // selectPlayer,
} from '../../reducers/game';

import {ArtWorkFilter} from '../../util/awFilter';
import {ArtItem} from '../../components';

type Props = BottomTabNavigationProp<GameTabParamList, 'Collector'>;

const Collector = (_: Props) => {
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
    </View>
  );
};

export default Collector;
