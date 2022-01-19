import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentHot,
  currentNPC,
  filterArtWorks,
  selectBalance,
  selectCity,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {ArtWork, Transaction, considerBuy} from '../../../util';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Sell'>;
const Sell = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const artwork = route.params.artwork;
  const npc = currentNPC(game);
  const hot = currentHot(game);
  const isHot = artwork.category === hot;
  const [offer, setOffer] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>('');

  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      <TextInput
        placeholder="Set a sale price"
        keyboardType="numeric"
        onChangeText={value => {
          const num = parseInt(value);
          setOffer(num === NaN ? Number.MAX_VALUE : num);
        }}
      />
      <Button
        title="Offer"
        onPress={() => {
          const decision = considerBuy(artwork, offer, npc.preference, isHot);
        }}
      />
      {dialogue.length > 0 && <Text>{dialogue}</Text>}
    </View>
  );
};

export default Sell;
