import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseContext } from '../components/ExerciseContext.js';
import { Styles, Constants } from '../styles/Styles.js';
import { Card } from 'react-native-paper';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const WorkoutListScreen = ({ navigation }) => {
  const { workouts, distanceUnit, deleteWorkout } = useContext(ExerciseContext);
  const [selectedSportType, setSelectedSportType] = useState(null);

  const workoutTypes = [
    { name: 'Running', icon: 'directions-run' },
    { name: 'Cycling', icon: 'directions-bike' },
    { name: 'Swimming', icon: 'pool' },
  ];

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
      <FlatList
        data={Object.entries(workoutsByType).map(([sportType, data]) => ({
          title: sportType,
          data: data,
        }))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={[
                Styles.sportTypeButton,
                { backgroundColor: selectedSportType === item.title ? '#0fb3ff' : '#b6b3b3' },
              ]}
              onPress={() => setSelectedSportType(selectedSportType === item.title ? null : item.title)}
            >
              <MaterialIcons name={workoutTypes.find(type => type.name === item.title)?.icon} size={24} color="white" />
              <Text style={Styles.sportTypeButtonText}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={Styles.totalDistanceText}>
              Total Distance: {totalDistanceForSportType(item.title)} {distanceUnit === 'km' ? 'km' : 'mi'}
            </Text>
            {selectedSportType === item.title && (
              <FlatList
                data={item.data}
                keyExtractor={(workout, index) => index.toString()}
                renderItem={({ item }) => (
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
            )}
          </View>
        )}
      />

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