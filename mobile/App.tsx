import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, View, StatusBar, Text} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import io, {Socket} from 'socket.io-client'

const App = () => {
  StatusBar.setBackgroundColor(Colors.lighter);
  StatusBar.setBarStyle('dark-content');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connected');
    });
    setSocket(socket)
  }, [])

  const sendMessage = () => {
    if (!socket) return
    socket.emit('chat message', message);
    setMessage('');
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.input}>
          <TextInput style={styles.textInput} 
                     onChangeText={chatmessage => {setMessage(chatmessage)}}
                     onSubmitEditing={sendMessage}
                     value={message}
                     />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
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
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'flex-end',
    flexDirection: "row"
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  textInput: {
    height: 40,
    alignSelf: 'center',
    width: '80%',

    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  sendBtn: {
    backgroundColor: '#00ff00',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,

  },
  text: {
    fontSize: 26,
    color: 'black'
  }
});

export default App;
