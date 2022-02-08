import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {currentNPC, getArtworkData, transact} from '../../../reducers/game';

import {considerBuy, ARTWORKS} from '../../../util';
import {Transaction} from '../../../util/types';
import {ArtItem, IntegerInput} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'Sell'>;
const Sell = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const {artworkId} = route.params;
  const artwork = ARTWORKS[artworkId];
  const artworkData = getArtworkData(game, artworkId);
  const npc = currentNPC(game);
  const [asking, setAsking] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>('');
  const [canSell, setCanSell] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  return (
    <View style={BaseStyle.container}>
      <ArtItem awd={artworkData} />
      {Number.isNaN(asking) ? (
        <Text style={BaseStyle.error}>Enter a valid number.</Text>
      ) : (
        <Text>Asking price: ${asking.toLocaleString()}</Text>
      )}
      <IntegerInput placeholder="Enter asking price" setNum={setAsking} />
      <Button
        title="Set Price"
        disabled={Number.isNaN(asking) || !canSell}
        onPress={() => {
          const decision = considerBuy(
            artworkData.currentValue,
            asking,
            artwork.category === npc.data.preference,
          );
          setDialogue(npc.character.dialogue.buying[decision]);
          if (decision === 'accept' || decision === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.id,
              price: asking,
              newOwner: npc.character.name,
            };
            dispatch(transact(t));
            setCanSell(false);
          }
        }}
      />
      {dialogue.length > 0 && <Text>{dialogue}</Text>}
    </View>
  );
};

export default Sell;
