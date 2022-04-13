import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArtItem} from '../../../components';
import {useAppSelector} from '../../../hooks';
import {
  filterArtWorks,
  ownsPowerUp,
  selectCity,
  selectPlayer,
} from '../../../reducers/game';
import {AuctionStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {ArtWorkFilter} from '../../../util/awFilter';
import {Artwork} from '../../../util/types';

type Props = NativeStackScreenProps<AuctionStackParamList, 'SellSelect'>;

const SellSelect = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const ownsYacht = ownsPowerUp(game, 'Yacht');
  const artFilter = new ArtWorkFilter({
    owner: o => o === player,
    destroyed: d => !d,
  });
  if (!ownsYacht) {
    artFilter.city = c => c === city;
  }

  const couldAuction: Artwork[] = filterArtWorks(game, artFilter);

  return (
    <View style={BaseStyle.container}>
      <Text>Select an artwork to sell at auction</Text>
      <FlatList
        data={couldAuction}
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() =>
              navigation.navigate('Sell', {artworkId: item.data.id})
            }
            location={ownsYacht}
          />
        )}
        ListEmptyComponent={() => (
          <Text>You have no art works available to sell in this city.</Text>
        )}
      />
    </View>
  );
};

export default SellSelect;
