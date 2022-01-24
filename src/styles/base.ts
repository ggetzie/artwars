import {StyleSheet} from 'react-native';

const BaseStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hot: {
    color: 'orangered',
  },
  pickerLabel: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  error: {
    fontWeight: 'bold',
    color: 'red',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    justifyContent: 'space-evenly',
  },
  cancelButton: {
    color: 'grey',
  },
});

export default BaseStyle;
