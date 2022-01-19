import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  selectBalance,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {considerSell, Transaction} from '../../../util';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Buy'>;

const Buy = ({navigation, route}: Props) => {
  const artwork = route.params.artwork;
  const game = useAppSelector(state => state.game);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const [offer, setOffer] = useState(0);
  const [message, setMessage] = useState('Go ahead, make an offer.');
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      <TextInput
        placeholder="Enter offer amount"
        keyboardType="numeric"
        onChangeText={value => setOffer(parseInt(value))}
      />
      <Button
        title="Make Offer"
        onPress={() => {
          if (offer > balance) {
            setMessage("You don't have that much money!");
            return;
          }
          const response = considerSell(artwork, offer, npc.preference);
          if (response === 'accept' || response === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.id,
              price: -1 * offer,
              newOwner: player,
            };
            dispatch(transact(t));
            setTimeout(() => navigation.goBack(), 2000);
          } else {
            setTimeout(() => setMessage('Try again'), 2000);
          }
          setMessage(npc.dialogue.buying[response]);
        }}
      />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
      <Text>{message}</Text>
    </View>
  );
};

export default Buy;
