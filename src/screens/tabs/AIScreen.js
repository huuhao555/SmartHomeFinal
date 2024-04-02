import React, { useState, useEffect } from 'react';
import { View,KeyboardAvoidingView, TextInput, TouchableOpacity, Button, FlatList, StyleSheet, Image, Text, } from 'react-native';

import IMAGES from '../../assets/images';

const MicroScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); 
  const [showAlert, setShowAlert] = useState(true);

 
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.69:8080");
    // Establish WebSocket connection 
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    ws.onerror = (error) => {
      console.log("WebSocket error", error);
    };

    return () => {
      if (ws.readyState !== ws.CLOSED) {
        ws.close();
      }
    };
  }, []);
 
  function wsService(messageUser){
    if (socket) {
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        var answerMessage = data.message[0];
        var language = data.message[1];

        console.log(messageUser) 
        const newMessage = {
          id: messages.length.toString(), // Change from message.length to messages.length
          text: messageUser,
          ans: answerMessage,
          timestamp: Date.now(),
        };

        setMessages([newMessage, ...messages]); // Change from message to messages
        
      };
    }
  }

  useEffect(() => {
    const retrieveMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.log('Error retrieving messages:', error);
      }
    };
    retrieveMessages();
  }, []);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage === '') {
      alert('Vui lòng nhập tin nhắn');
      return;
    }

    if (trimmedMessage.length > 255) {
      alert('Tin nhắn không được dài quá 255 ký tự');
      return;
    }

    const requestMessage = {
      text: trimmedMessage
    }

    if (socket) {
      socket.send(JSON.stringify(requestMessage));
      console.log(JSON.stringify(requestMessage));
    } else {
      console.log("WebSocket connection is not open");
    }
    
    setMessage('');

    wsService(trimmedMessage)
  };

  const clearMessages = async () => {
    try {
      setMessages([]);
      setAnswers([]);
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log('Error clearing messages:', error);
    }
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Close alert after 3 seconds

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);
  

  const renderItem = ({ item}) => (
    <View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.messageText}>{item.ans}</Text>
          <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
    </View>
  );
  

  return (
   <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}
   >
     <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
     
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Nhập tin nhắn..." 
          onSubmitEditing={sendMessage} 
          autoFocus={true}
        />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
      <TouchableOpacity onPress={clearMessages}>
        <Text style={styles.clearButton}>Xóa tin nhắn</Text>
      </TouchableOpacity>
    </View>
   </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 100,
  },
  messageContainer: {
    backgroundColor: '#76d7c4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '70%',
    alignSelf: 'flex-end'
  },
  answerContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  micro: { width: 30, height: 30 },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 5,
    marginLeft: 10,
    backgroundColor: '#fff',
  },
  clearButton: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
});

export default MicroScreen;


// import { View, Text, CustomButton} from 'react-native'
// import React from 'react'


// const AIScreen = () => {
//   return (
//     <View>
//       <Text>AIScreen</Text>
//     </View>
//   )
// }

// export default AIScreen

// import React, { useState, useEffect } from 'react';
// import SpeechRecognition from 'react-speech-recognition';

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continous = true;
// recognition.interimResults = true;
// recognition.lang = 'en-US' ; 
// // nếu bạn nhập ở đây là vn-VN để chuyển qua thành tiếng việt 
// // thì không chính xác đâu nhé,
// // lúc viết bài này, mình có tra qua bảng những ngôn ngữ hỗ trợ thì 
// // không thấy tiếng Việt nó có ghi trên đó
// // nhưng apply vào dự án thì cũng không cần nhập dữ liệu vào 
// // biến này thì nó vẫn nhận dạng được 
// // tiếng việt và tiếng Anh (yaoming) (thatvidieu)

// //------------------------COMPONENT-----------------------------

// const SpeechRecognitionn = ({ transcript, startListening, stopListening }) => {
//   const [content, setContent] = useState(null);
  
//   useEffect(() => {
//       setContent(transcript);
//   }, [transcript])

//   return (
//     <div className='container'>
//       <button className='button' onClick={() => startListening()}>
//           Start
//       </button>
//       <button className='button' onClick={() => stopListening()}>
//           Stop
//       </button>
//       <div className='content'>
//           {this.state.content}
//       </div>
//     </div>
//   )
// }

// SearchVoice.propTypes = {
//   // Props injected by SpeechRecognition
//   transcript: PropTypes.string,
//   resetTranscript: PropTypes.func,
//   browserSupportsSpeechRecognition: PropTypes.bool,
//   startListening: PropTypes.func,
//   abortListening: PropTypes.func,
//   recognition: PropTypes.object,
// };

// const options = {
//   autoStart: false
// }

// export default SpeechRecognitionn(options)(SpeechRecognition)

// import { View, Text } from 'react-native'
// import React from 'react'

// const AIScreen = () => {
//   return (
//     <View>
//       <Text>AIScreen</Text>
//     </View>
//   )
// }

// export default AIScreen