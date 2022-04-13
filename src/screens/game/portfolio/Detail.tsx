import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {
  currentHot,
  getArtwork,
  isUnderInvestigation,
  ownsPowerUp,
} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {Cities, NPCImages} from '../../../util';
import {CityName} from '../../../util/types';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;

const Investigation = () => {
  return (
    <>
      <Image style={InvestigationStyle.image} source={NPCImages.irsAgent} />
      <Text>The IRS is investigating your nefarious dealings!</Text>
      <Text>You can't move art between cities until you're cleared.</Text>
    </>
  );
};

const InvestigationStyle = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
  },
});

const Detail = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const {artworkId} = route.params;
  const artwork = getArtwork(game, artworkId);
  const hot = currentHot(game);
  const investigated = isUnderInvestigation(game);
  const value = Math.round(artwork.data.currentValue).toLocaleString();
  const ownsYacht = ownsPowerUp(game, 'Yacht');

  useEffect(() => {
    navigation.setOptions({title: artwork.static.title});
  }, [artwork, navigation]);
  const otherCities = Object.values(Cities).filter(
    c => c !== artwork.data.city,
  ) as CityName[];
  const [dest, setDest] = useState<CityName>(otherCities[0]);

  return (
    <View style={BaseStyle.container}>
      <Text>Artist: {artwork.static.artist}</Text>
      <Text>Value: ${value}</Text>
      <Text>
        Category:{' '}
        <Text style={hot === artwork.static.category ? BaseStyle.hot : {}}>
          {artwork.static.category}
        </Text>
      </Text>
      {investigated ? (
        <Investigation />
      ) : (
        <>
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
            disabled={ownsYacht}
          />
          {ownsYacht && (
            <Text>
              No need to schlep your art from city to city, Commodore. You can
              sell anywhere from your Yacht!
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Detail;
