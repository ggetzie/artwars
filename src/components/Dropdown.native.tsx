import React from 'react';
import {Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BaseStyle from '../styles/base';

type valueChangeFunc = (v: any, i: number) => void;

const Dropdown = ({
  onValueChange,
  selectedValue,
  itemList,
  label,
}: {
  onValueChange: valueChangeFunc;
  selectedValue: any;
  itemList: any[];
  label: string;
}) => {
  return (
    <>
      <Text style={BaseStyle.pickerLabel}>{label}</Text>
      <Picker
        onValueChange={onValueChange}
        selectedValue={selectedValue}
        accessibilityLabel={label}>
        {itemList.map((c, i) => (
          <Picker.Item key={i} label={c} value={c} />
        ))}
      </Picker>
    </>
  );
};

export default Dropdown;
