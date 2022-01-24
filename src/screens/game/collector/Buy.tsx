import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  selectBalance,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {considerSell, Transaction} from '../../../util';
import {ArtItem, IntegerInput} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';
import {selectDecimal} from '../../../reducers/settings';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Buy'>;

const Buy = ({navigation, route}: Props) => {
  const artwork = route.params.artwork;
  const game = useAppSelector(state => state.game);
  const settings = useAppSelector(state => state.settings);
  const decSep = selectDecimal(settings);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const [offer, setOffer] = useState<number>(0);
  const [message, setMessage] = useState('Go ahead, make an offer.');
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  let offerText;
  if (Number.isNaN(offer)) {
    offerText = <Text style={BaseStyle.error}>Enter a valid number.</Text>;
  } else {
    offerText = <Text>Offering ${offer.toLocaleString()}</Text>;
  }
  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      {offerText}
      <IntegerInput placeholder="Enter an offer amount" setNum={setOffer} />
      <View style={BaseStyle.buttonRow}>
        <Button
          title="Cancel"
          color="grey"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Make Offer"
          disabled={Number.isNaN(offer)}
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
            setMessage(npc.dialogue.selling[response]);
          }}
        />
      </View>
      <Text>{message}</Text>
    </View>
  );
};

export default Buy;