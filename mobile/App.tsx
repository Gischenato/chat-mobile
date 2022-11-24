import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, View, StatusBar, Text} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client'

const App = () => {
  StatusBar.setBackgroundColor(Colors.lighter);
  StatusBar.setBarStyle('dark-content');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connected');
    });
  }, [])
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.input}>
          <TextInput style={styles.textInput}/>
          <TouchableOpacity style={styles.sendBtn}>
            <Text style={styles.text}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    // backgroundColor: 'red',
    width: '100%',
    paddingHorizontal: 50,
    alignItems: 'flex-end',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    alignSelf: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  sendBtn: {
    marginTop: 5,
    borderRadius: 10,
    height: 40,
    width: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    color: 'black'
  }
});

export default App;
