import React from 'react';
import {View, TextInput} from 'react-native';
import {useAppSelector} from '../hooks';
import {selectDecimal} from '../reducers/settings';

const IntegerInput = ({
  placeholder,
  setNum,
  editable,
}: {
  placeholder?: string;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  editable?: boolean;
}) => {
  const settings = useAppSelector(state => state.settings);
  const decSep = selectDecimal(settings);
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        editable={editable}
        keyboardType="number-pad"
        onChangeText={value => {
          const cleaned = value.split(decSep)[0].replace(/\D+/g, '');
          const num = parseInt(cleaned, 10);
          setNum(num);
        }}
      />
    </View>
  );
};

export default IntegerInput;
