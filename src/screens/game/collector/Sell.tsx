import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {currentHot, currentNPC, transact} from '../../../reducers/game';

import {ArtWork, Transaction, considerBuy} from '../../../util';
import {ArtItem, IntegerInput} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Sell'>;
const Sell = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const artwork = route.params.artwork;
  const npc = currentNPC(game);
  const [asking, setAsking] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>('');
  const dispatch = useAppDispatch();
  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      {Number.isNaN(asking) ? (
        <Text style={BaseStyle.error}>Enter a valid number.</Text>
      ) : (
        <Text>Asking price: ${asking.toLocaleString()}</Text>
      )}
      <IntegerInput placeholder="Enter asking price" setNum={setAsking} />
      <Button
        title="Set Price"
        disabled={Number.isNaN(asking)}
        onPress={() => {
          const decision = considerBuy(artwork, asking, npc.preference);
          setDialogue(npc.dialogue.buying[decision]);
          if (decision === 'accept' || decision === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.id,
              price: asking,
              newOwner: npc.name,
            };
            dispatch(transact(t));
          }
        }}
      />
      {dialogue.length > 0 && <Text>{dialogue}</Text>}
    </View>
  );
};

export default Sell;
