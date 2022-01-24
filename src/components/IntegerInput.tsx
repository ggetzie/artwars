import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks';
import {selectDecimal, selectThousands} from '../reducers/settings';
import BaseStyle from '../styles/base';

const IntegerInput = ({
  placeholder,
  setNum,
}: {
  placeholder?: string;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const settings = useAppSelector(state => state.settings);
  const decSep = selectDecimal(settings);
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        keyboardType="number-pad"
        onChangeText={value => {
          const cleaned = value.split(decSep)[0].replace(/\D+/g, '');
          const num = parseInt(cleaned);
          setNum(num);
        }}
      />
    </View>
  );
};

export default IntegerInput;
