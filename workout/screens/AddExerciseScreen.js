import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { Styles, Constants } from '../styles/Styles.js';
import { ExerciseContext } from '../components/ExerciseContext.js';
import * as Font from 'expo-font';
//import { FlatList } from 'react-native-gesture-handler';

// Adding workout types
const workoutTypes = [
  { name: 'Running', icon: 'directions-run' },
  { name: 'Cycling', icon: 'directions-bike' },
  { name: 'Swimming', icon: 'pool' },
];

const AddExerciseScreen = ({ navigation }) => {
  const { addWorkout, distanceUnit } = useContext(ExerciseContext);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [shouldConvertDistance, setShouldConvertDistance] = useState(true);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Load fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error.message);
        // Handle font loading error here
      }
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (isFontLoaded) {
      //console.log('Font is loaded');
    }
  }, [isFontLoaded]);

  
  useEffect(() => {
    // Update distance input when the distanceUnit changes
    try {
      if (distance !== '' && shouldConvertDistance) {
        setDistance(convertDistance(parseFloat(distance), distanceUnit));
      }
    } catch (error) {
      console.error('Error converting distance:', error.message);
    }
  }, [distanceUnit]);

  // Handle day press
  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    setCalendarVisible(false);
  };

  // Handle workout type press
  const handleWorkoutTypePress = (type) => {
    setSelectedWorkoutType(type);
  };

  // Handle adding workout
  const handleAddWorkout = () => {
    try {
      if (!selectedWorkoutType || !distance || !duration || !selectedDate) {
        Alert.alert('Please fill in all fields.');
        return;
      }

      const numericDistance = parseFloat(distance);
      const numericDuration = parseFloat(duration);

      if (isNaN(numericDistance) || isNaN(numericDuration) || numericDistance < 0 || numericDuration < 0) {
        Alert.alert('Distance and duration must be positive numeric values.');

        // Reset distance and duration to empty strings
        setDistance('');
        setDuration('');

        return;
      }

      // Convert the distance based on the selected unit
      const convertedDistance = distanceUnit === 'mi' ? numericDistance / 1.60934 : numericDistance;

      const workout = {
        sportType: selectedWorkoutType.name,
        distance: convertedDistance.toFixed(2),
        duration: numericDuration,
        date: selectedDate,
      };

      addWorkout(workout);
    } catch (error) {
      console.error('Error adding workout:', error.message);
      // Handle adding workout error here
    }
  };

  // Convert distance
  const convertDistance = (value, unit) => {
    try {
      // Try parsing the value as a float
      const parsedValue = parseFloat(value);

      // Check if the parsed value is a valid number
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        // Return the converted distance based on the selected unit
        return unit === 'mi' ? (parsedValue / 1.60934).toString() : parsedValue.toString();
      } else {
        // If the value is not a valid number or is negative, return an empty string
        return '';
      }
    } catch (error) {
      console.error('Error converting distance:', error.message);
      return '';
    }
  };

  // Get the distance unit label
  const unitLabel = distanceUnit === 'mi' ? 'Miles' : 'Kilometers';

  return (
    <View style={Styles.container}>
      <Text style={[Styles.heading, isFontLoaded && { fontFamily: 'Lato-Regular' }]}>Choose Workout Type:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {workoutTypes.map((type) => (
          <TouchableOpacity
            key={type.name}
            style={[
              Styles.workoutTypeButton,
              { backgroundColor: selectedWorkoutType === type ? '#0fb3ff' : '#b6b3b3' },
            ]}
            onPress={() => handleWorkoutTypePress(type)}
          >
            <MaterialIcons name={type.icon} size={24} color={selectedWorkoutType === type ? 'white' : 'black'} />
            <Text style={Styles.workoutTypeButtonText}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[Styles.heading, { marginVertical: Constants.margin5 }, isFontLoaded && { fontFamily: 'Lato-Regular' }]}>
        Distance ({unitLabel})
      </Text>
      <TextInput
        style={[Styles.textInput, { marginBottom: Constants.margin5 }, isFontLoaded && { fontFamily: 'Lato-Regular' }]}
        keyboardType="numeric"
        value={distance}
        placeholder='Enter distance'
        onFocus={() => setShouldConvertDistance(false)}
        onBlur={() => setShouldConvertDistance(true)}
        onChangeText={(value) =>
          setDistance(shouldConvertDistance ? convertDistance(parseFloat(value), distanceUnit) : value)
        }
      />

      <Text style={Styles.heading}>Duration (minutes)</Text>
      <TextInput
        style={[Styles.textInput, { marginBottom: Constants.margin5 }]}
        keyboardType="numeric"
        value={duration}
        placeholder='Enter duration'
        onChangeText={setDuration}
      />

      <Text style={Styles.heading}>Date</Text>
      <TouchableOpacity
        style={Styles.styledButton}
        onPress={() => setCalendarVisible(true)}
      >
        <Text>{selectedDate || 'Select Date'}</Text>
      </TouchableOpacity>

      <Modal visible={isCalendarVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
            <MaterialIcons name="calendar-today" size={24} color="black" />
            <Calendar markedDates={{ [selectedDate]: { selected: true } }} onDayPress={handleDayPress} />
            <TouchableOpacity onPress={() => setCalendarVisible(false)}>
              <Text>Close Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={Styles.styledButton}
        onPress={handleAddWorkout}
      >
        <MaterialIcons name="playlist-add" size={24} color="black" />
        <Text>Add Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={Styles.styledButton}
        onPress={() => navigation.navigate('WorkoutList')}
      >
        <MaterialIcons name="filter-list" size={24} color="black" />
        <Text>Go to Workout List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={Styles.styledButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <MaterialIcons name="settings" size={24} color="black" />
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExerciseScreen;

