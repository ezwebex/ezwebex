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
    textAlignVertical: 'center',
  },
  content_wrapper: {
    flex: 2,
    padding: 25,
    alignItems: 'stretch',
  },
  button_text: {
    fontSize: 20,
  },
});

const Main: React.FC = (props) => {
  return (
    <SafeAreaView style={style.main}>
      <View style={style.wrapper}>
        <Title>EzWebex</Title>
      </View>
      <View style={style.content_wrapper}>
        <CustomButton
          onPress={() => {
            props.navigation.navigate('Timetable');
          }}>
          <Text style={style.button_text}>시간표 보기</Text>
        </CustomButton>
        <CustomButton
          onPress={() => {
            Alert.alert('wasans');
          }}>
          <Text style={style.button_text}>강의실 직접접속</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default Main;
