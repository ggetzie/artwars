import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

import {useAppSelector, useAppDispatch} from '../../../hooks';
import {
  getDuty,
  selectBalance,
  updateArtwork,
  debitBalance,
  getArtwork,
  ownsPowerUp,
} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Confirm'>;

const DutyMsg = ({txt}: {txt: string}) => {
  return (
    <>
      {txt.split('\n').map(s => (
        <Text>{s}</Text>
      ))}
    </>
  );
};

const Confirm = ({navigation, route}: Props) => {
  const {artworkId, destination} = route.params;

  const game = useAppSelector(state => state.game);
  const artwork = getArtwork(game, artworkId);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  let taxBill = 0;
  let canMove = false;
  const [message, setMessage] = useState('');
  let taxMessage = '';
  const [moved, setMoved] = useState(false);

  if (ownsPowerUp(game, `Freeport: ${destination}`)) {
    taxMessage = `No import duties required, thanks to your freeport in ${destination}`;
    taxBill = 0;
    canMove = true;
  } else {
    const duty = getDuty(game, destination);
    taxBill = Math.round(duty * artwork.data.currentValue);
    canMove = balance > taxBill;
    if (canMove) {
      taxMessage = `${destination} charges an import duty of {duty * 100}% of the value of the artwork.
      $${taxBill.toLocaleString()} will be deducted from your cash balance. Proceed?`;
    } else {
      taxMessage = `${
        duty * 100
      }% import duty at ${destination} amounts to a tax bill of $${taxBill.toLocaleString()}
      You don't have enough cash to pay the tax man! Try selling some artworks to raise capital.`;
    }
  }

  return (
    <View style={BaseStyle.container}>
      <Text>
        Confirm moving {artwork.static.title} from {artwork.data.city} to{' '}
        {destination}.
      </Text>
      <DutyMsg txt={taxMessage} />
      {canMove && (
        <Button
          title="Confirm"
          onPress={() => {
            dispatch(
              updateArtwork({
                ...artwork.data,
                city: destination,
              }),
            );
            dispatch(debitBalance(taxBill));
            setMoved(true);
            setMessage('Move complete!');
          }}
          disabled={moved}
        />
      )}

      {message.length > 0 && <Text>{message}</Text>}
    </View>
  );
};

export default Confirm;
