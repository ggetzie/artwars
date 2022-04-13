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
    paddingTop: 5,
  },
  button: {
    justifyContent: 'center',
    minWidth: 60,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    color: 'grey',
  },
  dangerButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  successButton: {
    backgroundColor: 'green',
  },
  whiteText: {
    color: 'white',
  },
});

export default BaseStyle;
