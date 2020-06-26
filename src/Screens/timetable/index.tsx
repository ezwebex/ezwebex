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
  date_wrapper: {
    backgroundColor: '#CCC',
    padding: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date_text: {
    fontSize: 20,
    alignSelf: 'center',
  },
  date_month: {
    fontWeight: 'bold',
  },
  date_day: {
    fontWeight: 'bold',
  },
  dateUpdateButton: {
    fontSize: 20,
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
  
  const [date, setDate] = useState(new Date("2020-06-25T00:00:00"));

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
