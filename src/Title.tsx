import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Title: React.FC = (props) => {
  return (
    <View style={style.wrapper}>
      <Text style={style.title}>{props.children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'left',
  },
  wrapper: {
    backgroundColor: 'red',
    textAlignVertical: 'center',
    marginVertical: 'auto',
  },
});

export default Title;
