import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../../../hooks';
import {filterArtWorks, selectCity, selectPlayer} from '../../../reducers/game';

import {ArtWorkFilter} from '../../../util/awFilter';
import {Artwork} from '../../../util/types';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'SellSelect'>;
const SellSelect = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const forSale: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === player, city: c => c === city}),
  );
  return (
    <View style={BaseStyle.container}>
      <Text>Oh you want to sell me something? Let's see what you've got.</Text>
      <FlatList
        data={forSale}
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() =>
              navigation.navigate('Sell', {artworkId: item.data.id})
            }
          />
        )}
        ListEmptyComponent={<Text>You don't have anything to sell.</Text>}
      />
    </View>
  );
};

export default SellSelect;
