import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ExerciseContext } from '../components/ExerciseContext.js';
import { Styles, Constants } from '../styles/Styles.js';

const SettingsScreen = ({ navigation }) => {
  const { distanceUnit, setDistanceUnit } = useContext(ExerciseContext);
  const [unit, setUnit] = useState(distanceUnit);

  const convertDistance = (distance, currentUnit, targetUnit) => {
    const conversionFactor = currentUnit === 'km' ? 0.621371 : 1.60934;
    return distance * conversionFactor;
  };

  const handleUnitChange = (newUnit) => {
    if (unit !== newUnit) {
      setUnit(newUnit);

      // Ensure that setDistanceUnit is defined in your ExerciseContext
      if (setDistanceUnit) {
        setDistanceUnit(newUnit);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Units Change</Text>
      <View style={Styles.radioButtonContainer}>
        <RadioButton
          value="km"
          status={unit === 'km' ? 'checked' : 'unchecked'}
          onPress={() => handleUnitChange('km')}
        />
        <Text style={Styles.radioButtonLabel}>Kilometers</Text>
      </View>
      <View style={Styles.radioButtonContainer}>
        <RadioButton
          value="mi"
          status={unit === 'mi' ? 'checked' : 'unchecked'}
          onPress={() => handleUnitChange('mi')}
        />
        <Text style={Styles.radioButtonLabel}>Miles</Text>
      </View>

      {/* Navigation buttons */}
      <View style={Styles.navigationButtonsContainer}>
        <Button
          title="Go to Add Exercise"
          onPress={() => navigation.navigate('AddExercise')}
          style={Styles.navigationButton}
          titleStyle={Styles.navigationButtonText}
        />
        <Button
          title="Go to Workout List"
          onPress={() => navigation.navigate('WorkoutList')}
          style={Styles.navigationButton}
          titleStyle={Styles.navigationButtonText}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;