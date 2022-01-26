import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {currentHot} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {Cities} from '../../../util';
import {CityName} from '../../../util/cities';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;

const Detail = ({navigation, route}: Props) => {
  const artwork = route.params.artwork;
  const game = useAppSelector(state => state.game);
  const hot = currentHot(game);
  const value = Math.round(artwork.value).toLocaleString();

  useEffect(() => {
    navigation.setOptions({title: artwork.title});
  }, [artwork]);
  const otherCities = Object.values(Cities).filter(
    c => c !== artwork.city,
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
          navigation.navigate('Confirm', {artwork: artwork, destination: dest})
        }
      />
    </View>
  );
};

export default Detail;
