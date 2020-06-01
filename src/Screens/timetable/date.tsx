import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {DateProps} from './interface';

const TodayDate: React.FC<DateProps> = (props: DateProps) => {
  const style = StyleSheet.create({
    wrapper: {
      backgroundColor: '#CCC',
      padding: 20,
    },
    text: {
      fontSize: 20,
      alignSelf: 'center',
    },
    month: {
      fontWeight: 'bold',
    },
    date: {
      fontWeight: 'bold',
    },
  });
  const date = props.date;
  return (
    <View style={style.wrapper}>
      <Text style={style.text}>
        <Text style={style.month}>{date.getMonth() + 1}</Text>월{' '}
        <Text style={style.date}>{date.getDate()}</Text>일
      </Text>
    </View>
  );
};

export default TodayDate;
