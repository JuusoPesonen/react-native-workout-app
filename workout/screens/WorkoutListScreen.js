import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseContext } from '../components/ExerciseContext.js';
import { Styles, Constants } from '../styles/Styles.js';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutListScreen = ({ navigation }) => {
  const { workouts, distanceUnit, deleteWorkout } = useContext(ExerciseContext);
  const [selectedSportType, setSelectedSportType] = useState(null);

  // Organize workouts by sportType
  const workoutsByType = workouts.reduce((acc, workout) => {
    if (!acc[workout.sportType]) {
      acc[workout.sportType] = [];
    }
    acc[workout.sportType].push(workout);
    return acc;
  }, {});


  // Handle deleting a workout
  const handleDeleteWorkout = (workout) => {
    deleteWorkout(workout);
  };

  // Calculate total distance for a specific sport type
  const totalDistanceForSportType = (sportType) => {
    const distances = workoutsByType[sportType]
      ? workoutsByType[sportType].reduce((sum, workout) => {
        const distanceValue = parseFloat(workout.distance);

        if (!isNaN(distanceValue)) {
          return sum + distanceValue;
        } else {
          return sum;
        }
      }, 0)
      : 0;
    return distances.toFixed(2);
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.sportTypeButtonsContainer}>
          {Object.keys(workoutsByType).map((sportType) => (
            <TouchableOpacity
              key={sportType}
              style={[
                Styles.sportTypeButton,
                { backgroundColor: selectedSportType === sportType ? '#0fb3ff' : '#b6b3b3' },
              ]}
              onPress={() => setSelectedSportType(selectedSportType === sportType ? null : sportType)}
            >
              <Text style={Styles.sportTypeButtonText}>
                {sportType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSportType !== null && (
          <View>
            <Text style={Styles.sportTypeHeaderText}>{selectedSportType}</Text>
            <Text style={Styles.totalDistanceText}>
              Total Distance: {totalDistanceForSportType(selectedSportType)} {distanceUnit === 'km' ? 'km' : 'mi'}
            </Text>
            <FlatList
              data={workoutsByType[selectedSportType]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Card style={Styles.workoutCard}>
                  <Text style={Styles.sportTypeText}>{item.sportType}</Text>
                  <Text style={[Styles.distanceText, { marginBottom: Constants.margin5 }]}>
                    Distance: {item.distance} {distanceUnit === 'km' ? 'km' : 'mi'}
                  </Text>
                  <Text style={Styles.durationText}>Duration: {item.duration} minutes</Text>
                  <Text style={Styles.dateText}>Workout Date: {item.date}</Text>
                  <TouchableOpacity
                    style={Styles.deleteButton}
                    onPress={() => handleDeleteWorkout(item)}
                  >
                    <FontAwesome name="trash" size={24} color="black" />
                    <Text style={Styles.deleteButtonText}>Remove</Text>
                  </TouchableOpacity>
                </Card>
              )}
            />
          </View>
        )}
      </ScrollView>

      {/* Navigation buttons */}
      <View style={Styles.navigationButtonsContainer}>
        <TouchableOpacity
          style={Styles.navigationButton}
          onPress={() => navigation.navigate('AddExercise')}
        >
          <Text style={Styles.navigationButtonText}>Go to Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.navigationButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={Styles.navigationButtonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutListScreen;