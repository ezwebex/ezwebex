import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/Screens/main';
import Timetable from './src/Screens/timetable';

const StackNav = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StackNav.Navigator>
          <StackNav.Screen
            name="Main"
            component={Main}
            options={{
              title: 'WebEx',
            }}
          />
          <StackNav.Screen name="Timetable" component={Timetable} />
        </StackNav.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
