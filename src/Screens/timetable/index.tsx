import React, { useState } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Timetable from './timetable';
import TodayDate from './date';

const style = StyleSheet.create({
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

interface TimetableFormat {
  title: string;
  lectureCode: string;
  startTime: string;
  endTime: string;
  professorName: string;
  professorCode: number;
}

const Main: React.FC = (props) => {
  
  const [date, setDate] = useState(new Date());

  return (
    <SafeAreaView>
      <TodayDate
        date={date}
        onUpdate={((date: Date) => {
          setDate(date);
          console.warn("New Update", date); 
        })
      } />
      <Timetable date={date} navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default Main;
