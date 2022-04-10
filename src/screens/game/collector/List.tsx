import React from 'react';
import {View, Text, Button, FlatList, Image} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../../../hooks';
import {currentNPC, filterArtWorks} from '../../../reducers/game';

import {ArtWorkFilter} from '../../../util/awFilter';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';
import {Artwork} from '../../../util/types';
import {NPCImages} from '../../../util';
import PicStyle from '../../../styles/pics';

type Props = NativeStackScreenProps<CollectorStackParamList, 'List'>;

const List = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const linkTo = useLinkTo();
  const npc = currentNPC(game);
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.character.name}),
  );
  return (
    <View style={BaseStyle.container}>
      <View>
        <Image style={PicStyle.large} source={NPCImages[npc.character.image]} />
        <Text>{npc.character.bio}</Text>

        <Text>Likes: {npc.data.preference}</Text>
      </View>
      <View>
        <Button title="Sell" onPress={() => linkTo('/game/collector/sell/')} />
      </View>

      <Text style={BaseStyle.heading1}>Collection</Text>
      <FlatList
        data={artworks}
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => linkTo(`/game/collector/buy/${item.data.id}/`)}
          />
        )}
      />
    </View>
  );
};

export default List;
