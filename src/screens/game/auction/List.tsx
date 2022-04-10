import React from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {useLinkTo} from '@react-navigation/native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ArtItem} from '../../../components';
import {useAppSelector} from '../../../hooks';
import {filterArtWorks, selectCity} from '../../../reducers/game';
import {Artwork} from '../../../util/types';
import {ArtWorkFilter} from '../../../util/awFilter';
import {AuctionStackParamList} from '.';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<AuctionStackParamList, 'List'>;

const List = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const linkTo = useLinkTo();
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({
      auction: a => a === true,
      city: c => c === city,
      destroyed: d => d === false,
    }),
  );

  return (
    <View style={BaseStyle.container}>
      <Button title="Sell" onPress={() => linkTo('/game/auction/sell/')} />
      <FlatList
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => linkTo(`/game/auction/buy/${item.data.id}`)}
          />
        )}
        data={artworks}
        ListEmptyComponent={() => <Text>No works for auction</Text>}
      />
    </View>
  );
};

export default List;
