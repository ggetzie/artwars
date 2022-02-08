import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  getArtworkData,
  selectBalance,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {ARTWORKS, considerSell} from '../../../util';
import {Transaction} from '../../../util/types';
import {ArtItem, IntegerInput} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Buy'>;

const Buy = ({route}: Props) => {
  const game = useAppSelector(state => state.game);
  const awId = route.params.artworkId;
  const artwork = ARTWORKS[awId];
  const artworkData = getArtworkData(game, awId);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const [offer, setOffer] = useState<number>(0);
  const [dialogue, setDialogue] = useState('Give me your best offer.');
  const [sold, setSold] = useState<boolean>(false);
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
      <ArtItem awd={artworkData} />
      {offerText}
      <IntegerInput placeholder="Enter an offer amount" setNum={setOffer} />
      <Button
        title="Make Offer"
        disabled={Number.isNaN(offer) || sold}
        onPress={() => {
          if (offer > balance) {
            setDialogue("You don't have that much money!");
            return;
          }
          const response = considerSell(
            artworkData.currentValue,
            offer,
            artwork.category === npc.data.preference,
          );
          setDialogue(npc.character.dialogue.selling[response]);
          if (response === 'accept' || response === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.id,
              price: -1 * offer,
              newOwner: player,
            };
            dispatch(transact(t));
            setSold(true);
          }
        }}
      />
      <Text>{dialogue}</Text>
    </View>
  );
};

export default Buy;
