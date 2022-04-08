import React, {ChangeEventHandler} from 'react';
import {Text} from 'react-native';
import BaseStyle from '../styles/base';

type listItem = [any, string];

const Dropdown = ({
  onValueChange,
  selectedValue,
  itemList,
  label,
  style,
}: {
  onValueChange: Function;
  selectedValue: any;
  itemList: listItem[];
  label: string;
  style?: any;
}) => {
  return (
    <>
      <Text style={style?.label || BaseStyle.pickerLabel}>{label}</Text>
      <select
        style={style?.control}
        onChange={onValueChange as ChangeEventHandler<HTMLSelectElement>}>
        {itemList.map(([v, l], i) => (
          <option key={i} selected={v === selectedValue}>
            {l}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
