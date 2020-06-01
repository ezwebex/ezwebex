import {SafeAreaView, View, Alert, Text, StyleSheet} from 'react-native';
import Title from '../Title';
import CustomButton from '../Button';
import React from 'react';

const style = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  wrapper: {
    flex: 1,
    padding: 25,
  },
  content_wrapper: {
    flex: 1,
    padding: 25,
    alignItems: 'stretch',
  },
});

const Main: React.FC = (props) => {
  return (
    <SafeAreaView style={style.main}>
      <View style={style.wrapper}>
        <Text>YEAH!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Main;
