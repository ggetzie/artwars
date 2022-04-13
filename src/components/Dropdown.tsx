import React, {ChangeEventHandler} from 'react';
import {Text} from 'react-native';
import BaseStyle from '../styles/base';

const Dropdown = ({
  onValueChange,
  selectedValue,
  itemList,
  label,
}: {
  onValueChange: Function;
  selectedValue: any;
  itemList: any[];
  label: string;
}) => {
  return (
    <>
      <Text style={BaseStyle.pickerLabel}>{label}</Text>
      <select onChange={onValueChange as ChangeEventHandler<HTMLSelectElement>}>
        {itemList.map(([c, i]) => (
          <option key={i} selected={c === selectedValue}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
