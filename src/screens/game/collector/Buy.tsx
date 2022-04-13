import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  getArtwork,
  selectBalance,
  selectPlayer,
  transact,
} from '../../../reducers/game';
import {considerSell} from '../../../util';
import {Transaction} from '../../../util/types';
import {ArtItem, IntegerInput, NPCDialog} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Buy'>;

const Buy = ({route}: Props) => {
  const game = useAppSelector(state => state.game);
  const artworkId = route.params.artworkId;
  const artwork = getArtwork(game, artworkId);
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
      <ArtItem artwork={artwork} />
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
            artwork.data.currentValue,
            offer,
            artwork.static.category === npc.data.preference,
          );
          setDialogue(npc.character.dialogue.selling[response]);
          if (response === 'accept' || response === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.data.id,
              price: -1 * offer,
              newOwner: player,
            };
            dispatch(transact(t));
            setSold(true);
          }
        }}
      />
      <NPCDialog dialogue={dialogue} image={npc.character.image} />
    </View>
  );
};

export default Buy;
