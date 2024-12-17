import React, { useState, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Alert, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './redux/Action';
import { English, urdu } from './English';
import Question from './Question';

const { width } = Dimensions.get('window');

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); 
  const [current, setCurrent] = useState(0);
  const [language, setLanguage] = useState('English');
  const [questions, setQuestions] = useState(language === 'English' ? English : urdu);
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(theme === 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setIsEnabled(!isEnabled);
    dispatch(setTheme(newTheme));
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'English' ? 'Urdu' : 'English';
    setLanguage(newLanguage);
    setQuestions(newLanguage === 'English' ? English : urdu);
    setCurrent(0); // Reset current question index to start from the beginning
    flatListRef.current.scrollToIndex({ animated: true, index: 0 }); // Scroll to the first question
  };

  const backgroundColor = theme === 'light' ? '#fff' : '#333';
  const textColor = theme === 'light' ? '#000' : '#fff';

  const getTextScore = () => {
    if (!questions || !Array.isArray(questions)) return 0;
    return questions.reduce((score, question) => {
      return question.marked === question.correct ? score + 1 : score;
    }, 0);
  };

  const OnSelectOption = (index, selectedOption) => {
    const tempData = questions.map((item, ind) => {
      if (index === ind) {
        Alert.alert(
          selectedOption === item.correct ? 'Correct!' : 'Incorrect!',
          `You selected the ${selectedOption === item.correct ? 'correct' : 'incorrect'} answer.`,
          [{ text: 'OK' }]
        );
        return {
          ...item,
          marked: selectedOption,
          correctColor: selectedOption === item.correct ? 'green' : 'red',
        };
      }
      return item;
    });
    setQuestions(tempData);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      flatListRef.current.scrollToIndex({ animated: true, index: current + 1 });
    } else {
      setModalVisible(true);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      flatListRef.current.scrollToIndex({ animated: true, index: current - 1 });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 20, color: textColor }}>
        Question: {current + 1}/{questions.length}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 20, color: 'green' }}>
        Score: {getTextScore()}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isEnabled}
      />
      <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
        <Text style={styles.languageButtonText}>Switch to {language === 'English' ? 'Urdu' : 'English'}</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={questions}
          renderItem={({ item, index }) => (
            <Question
              data={item}
              onselectoption={(x) => OnSelectOption(index, x)}
              correctColor={item.correctColor}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrent(Math.round(x));
          }}
        />
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={current === 0}
          style={[styles.navButton, { backgroundColor: current === 0 ? 'grey' : 'purple' }]}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>
            {current === questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Score</Text>
            <Text style={styles.modalText}>{getTextScore()}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    width: '90%',
    alignSelf: 'center',
  },
  navButton: {
    height: 50,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  navButtonText: {
    color: 'white',
    fontWeight: '900',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: '50%',
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 150,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    marginTop: 70,
  },
  languageButton: {
    padding: 10,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  languageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
