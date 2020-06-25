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
    fontSize: 60,
    textAlign: 'left',
    marginTop: '20%',
  },
  wrapper: {
    textAlignVertical: 'center',
    marginVertical: 'auto',
  },
});

export default Title;
