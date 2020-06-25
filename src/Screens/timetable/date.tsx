import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MiscellaneousProps} from './interface';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TodayDate: React.FC<MiscellaneousProps> = (props: MiscellaneousProps) => {
  const style = StyleSheet.create({
    wrapper: {
      backgroundColor: '#CCC',
      padding: 20,

      flexDirection: 'row',
      justifyContent: 'space-between',
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
    dateUpdateButton: {
      fontSize: 20,
    },
  });
  const [date, setDate] = useState(props.date ? props.date : new Date());
  const onUpdate = props.onUpdate;

  return (
    <View style={style.wrapper}>
      <TouchableOpacity
        onPress={() => {
          date.setDate(date.getDate() - 1);
          setDate(date);
          if (onUpdate) {
            onUpdate(date);
          }
        }}>
        <Text style={style.dateUpdateButton}>&lt;</Text>
      </TouchableOpacity>

      <View>
        <Text style={style.text}>
          <Text style={style.month}>{date.getMonth() + 1}</Text>월{' '}
          <Text style={style.date}>{date.getDate()}</Text>일
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          date.setDate(date.getDate() + 1);
          setDate(date);
          if (onUpdate) {
            onUpdate(date);
          }
        }}>
        <Text style={style.dateUpdateButton}>&gt;</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodayDate;
