import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {currentHot, getArtworkData} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {ARTWORKS, Cities} from '../../../util';
import {CityName} from '../../../util/types';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;

const Detail = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const {artworkId} = route.params;
  const artwork = ARTWORKS[artworkId];
  const artworkData = getArtworkData(game, artworkId);
  const hot = currentHot(game);
  const value = Math.round(artworkData.currentValue).toLocaleString();

  useEffect(() => {
    navigation.setOptions({title: artwork.title});
  }, [artwork]);
  const otherCities = Object.values(Cities).filter(
    c => c !== artworkData.city,
  ) as CityName[];
  const [dest, setDest] = useState<CityName>(otherCities[0]);

  return (
    <View style={BaseStyle.container}>
      <Text>Artist: {artwork.artist}</Text>
      <Text>Value: ${value}</Text>
      <Text>
        Category:{' '}
        <Text style={hot === artwork.category ? BaseStyle.hot : {}}>
          {artwork.category}
        </Text>
      </Text>
      <Text style={BaseStyle.pickerLabel}>Move to city</Text>
      <Picker
        accessibilityLabel="Move to city"
        selectedValue={dest}
        onValueChange={(itemValue: CityName, _) => {
          setDest(itemValue);
        }}>
        {otherCities.map((c, i) => (
          <Picker.Item key={i} label={c} value={c} />
        ))}
      </Picker>
      <Button
        title="Move"
        onPress={() =>
          navigation.navigate('Confirm', {
            artworkId: artworkId,
            destination: dest,
          })
        }
      />
    </View>
  );
};

export default Detail;
