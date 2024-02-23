import React, { createContext, useState } from 'react';

const ExerciseContext = createContext();

const ExerciseProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState('km');

  // Add a workout to the list
  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
  
  };

  // Delete a workout from the list
  const deleteWorkout = (workout) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w !== workout));
  };

  // const deleteWorkout = (index) => {
  //   const updatedWorkouts = [...workouts];
  //   updatedWorkouts.splice(index, 1);
  //   setWorkouts(updatedWorkouts);
  // };

  const contextValue = { workouts, addWorkout, distanceUnit, setDistanceUnit, deleteWorkout };

  return (
    <ExerciseContext.Provider value={contextValue}>
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseProvider };