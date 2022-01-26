import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

import {useAppSelector, useAppDispatch} from '../../../hooks';
import {
  getDuty,
  selectBalance,
  updateArtwork,
  debitBalance,
} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Confirm'>;

const Confirm = ({navigation, route}: Props) => {
  const {artwork, destination} = route.params;
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  const duty = getDuty(game, destination);
  const taxBill = Math.round(duty * artwork.value);
  const canMove = balance > taxBill;
  const [message, setMessage] = useState('');
  const [moved, setMoved] = useState(false);

  return (
    <View style={BaseStyle.container}>
      {canMove ? (
        <>
          <Text>
            Confirm moving {artwork.title} from {artwork.city} to {destination}.
          </Text>
          <Text>
            {destination} charges an import duty of {duty * 100}% of the value
            of the artwork.
          </Text>
          <Text>
            ${taxBill.toLocaleString()} will be deducted from your cash balance.
            Proceed?
          </Text>
          <Button
            title="Confirm"
            onPress={() => {
              dispatch(
                updateArtwork({
                  ...artwork,
                  city: destination,
                }),
              );
              dispatch(debitBalance(taxBill));
              setMoved(true);
              setMessage('Move complete!');
            }}
            disabled={moved}
          />
        </>
      ) : (
        <>
          <Text>
            {duty * 100}% import duty at {destination} amounts to a tax bill of{' '}
            {taxBill}
          </Text>
          <Text>
            You don't have enough cash to pay the tax man! Try selling some
            artworks to raise capital.
          </Text>
        </>
      )}
      {message.length > 0 && <Text>{message}</Text>}
    </View>
  );
};

export default Confirm;
