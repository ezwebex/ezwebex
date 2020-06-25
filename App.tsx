import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/Screens/main';
import Timetable from './src/Screens/timetable';
import Login from './src/Screens/timetable/login';
import ClassInfo from './src/Screens/timetable/classinfo';

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
          <StackNav.Screen name="Login" component={Login} />
          <StackNav.Screen name="ClassInfo" component={ClassInfo} />
        </StackNav.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
