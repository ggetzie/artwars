import {StyleSheet} from 'react-native';
export const AW_RED = '#f57179';
export const AW_BLUE = '#8f8798';
export const AW_YELLOW = '#feedba';

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
    color: AW_RED,
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
  navButton: {
    marginHorizontal: '15%',
    height: 30,
    backgroundColor: AW_RED,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  navButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default BaseStyle;
