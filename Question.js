import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './redux/Action';

const Question = ({ data, onselectoption, correctColor }) => {
  const dispatch = useDispatch();

  const { width } = Dimensions.get('window');
  const letters = ['A', 'B', 'C', 'D'];

  const theme = useSelector((state) => state.theme.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const backgroundColor = theme === 'light' ? '#fff' : '#333';
  const textColor = theme === 'light' ? '#000' : '#fff';

  return (
    <View style={{ width: width, justifyContent: 'center', padding: 20, backgroundColor }}>
      <Text
        style={{
          fontSize: 20,
          color: textColor,
          fontWeight: '900',
        }}>
        {data.question}
      </Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data.Options}
        renderItem={({ item, index }) => {
          const isSelected = data.marked === index + 1;
          const optionBackgroundColor = isSelected ? 'purple' : '#fff';
          const circleBackgroundColor = isSelected ? '#fff' : 'cyan';
          const optionTextColor = isSelected ? '#fff' : textColor;

          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => onselectoption(index + 1)}
                style={[
                  styles.optionContainer,
                  { backgroundColor:backgroundColor },
                ]}>
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: circleBackgroundColor },
                  ]}>
                  <Text>{letters[index]}</Text>
                </View>
                <Text style={[styles.optionText, { color: optionTextColor }]}>{item}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    height: 60,
    elevation: 7,
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 0,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 30,
  },
});
