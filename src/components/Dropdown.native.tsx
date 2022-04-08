import React from 'react';
import {Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BaseStyle from '../styles/base';

type valueChangeFunc = (v: any, i: number) => void;
type listItem = [any, string];
const Dropdown = ({
  onValueChange,
  selectedValue,
  itemList,
  label,
  style,
}: {
  onValueChange: valueChangeFunc;
  selectedValue: any;
  itemList: listItem[];
  label: string;
  style?: {label: {}; control: {}};
}) => {
  return (
    <>
      <Text style={style?.label || BaseStyle.pickerLabel}>{label}</Text>
      <Picker
        onValueChange={onValueChange}
        selectedValue={selectedValue}
        accessibilityLabel={label}
        style={style?.control}>
        {itemList.map(([v, l], i) => (
          <Picker.Item key={i} label={l} value={v} />
        ))}
      </Picker>
    </>
  );
};

export default Dropdown;
