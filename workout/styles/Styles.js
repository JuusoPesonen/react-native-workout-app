import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: '#e1cc7f',
  },
  heading: {
    fontSize: 18,
    fontFamily: 'LatoRegular',
    fontWeight: 'bold',
    marginTop: 10,
  },
  workoutTypeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 10,
    margin: 10
  },
  workoutTypeButtonText: {
    marginLeft: 10,
  },
  textInput: {
    height: 40,
    fontSize: 16,
    fontFamily: 'LatoRegular',
    borderColor: 'gray',
    backgroundColor: '#e5f6f4',
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    width: 250
  },
  totalDistanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sportTypeText: {
    fontWeight: 'bold',
  },
  distanceText: {
    marginTop: 5,
  },
  durationText: {
    marginTop: 5,
  },
  dateText: {
    marginTop: 5,
    color: '#888',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  radioButton: {
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Constants.margin10,
  },
  navigationButton: {
    backgroundColor: '#0fb3ff',
    padding: Constants.padding10,
    borderRadius: Constants.borderRadius,
    alignItems: 'center',
    flex: 1, // Add this line to make buttons take equal width
  },
  navigationButtonText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    ...this.latoRegular,
  },
  workoutCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#ffd255',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 300,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 5,
  },
  styledButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 25,
    marginTop: 20,
    width: 200,
    backgroundColor: '#70ffff',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  sportTypeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Constants.margin10,
  },
  sportTypeButton: {
    borderRadius: 25,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  
  sportTypeButtonText: {
    color: 'white',
    marginLeft: 5
  },

  sportTypeHeaderText: {
    fontSize: Constants.fontSize20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Constants.margin10,
  },

});

export { Styles, Constants };