import React, { useState, useEffect, useRef,useContext } from 'react';
import { View, SafeAreaView, Image, StyleSheet, Switch, Text, TouchableOpacity, PanResponder, ImageBackground } from 'react-native';


import { colors } from '@mui/material';
import {AppContext} from '../../theme/AppContext';

import IMAGES from '../../assets/images';
import SessionStorage from 'react-native-session-storage';
import { apiLink } from '../../header/url';
import NotificationScreen from './NotificationScreen';

const API_KEY = '89e540382ebe3310999da425312cf172'; 

const HomeAppScreen = (props) => {
  const [username, setUsername] = useState("");
  const {navigation} = props;

  useEffect( async () => {
    const token = SessionStorage.getItem('@storage_key');
  try {
    const response = await fetch(apiLink + '/api/user/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert("Đăng nhập thất bại vui lòng thử lại.");
      navigation.navigate(SCREENS.LOGIN);
      return;
    }
    const data = await response.json();
    console.log('Login successful:', data.name);//
    setUsername(data.name.toString());
    
  } catch (error) {
    alert("Đăng nhập thất bại vui lòng thử lại.");
    navigation.navigate(SCREENS.LOGIN);
  }
  }, []);

  const [isSwitch1Enabled, setSwitch1Enabled] = useState(false);
  const [isSwitch2Enabled, setSwitch2Enabled] = useState(false);
  const [isSwitch3Enabled, setSwitch3Enabled] = useState(false);
  const [isSwitch4Enabled, setSwitch4Enabled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentTemperature, setCurrentTemperature] = useState(null);

  const toggleSwitch1 = async () => {
    if (!isSwitch1Enabled){
      try {
        const response = await fetch(apiLink + '/api/control/led-on', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "topic": "led01"
          }),
        });
  
      } catch (error) {
        returns
      }
    }else{
      try {
        const response = await fetch(apiLink + '/api/control/led-off', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "topic": "led01"
          }),
        });
  
      } catch (error) {
        returns
      }
    }
    // NotificationScreen(!isSwitch1Enabled, isSwitch2Enabled, isSwitch3Enabled,isSwitch4Enabled);
    setSwitch1Enabled(prevState1 => !prevState1);
  };
  
  const toggleSwitch3 = async () => {
    if (!isSwitch3Enabled){
      try {
        const response = await fetch(apiLink + '/api/control/led-on', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "topic": "led02"
          }),
        });
  
      } catch (error) {
        returns
      }
    }else{
      try {
        const response = await fetch(apiLink + '/api/control/led-off', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "topic": "led02"
          }),
        });
  
      } catch (error) {
        returns
      }
    }
    NotificationScreen(!isSwitch1Enabled, isSwitch2Enabled, isSwitch3Enabled,isSwitch4Enabled);
    setSwitch3Enabled(prevState3 => !prevState3);
  };
  const toggleSwitch2 = async () => {
    // if (!isSwitch2Enabled){
    //   try {
    //     const response = await fetch('http://192.168.1.23:3000/api/control/fan-on', {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "topic": "fan01"
    //       }),
    //     });
  
    //   } catch (error) {
    //     returns
    //   }
    // }else{
    //   try {
    //     const response = await fetch('http://192.168.1.23:3000/api/control/fan-off', {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "topic": "fan01"
    //       }),
    //     });
  
    //   } catch (error) {
    //     returns
    //   }
    // }
    NotificationScreen(!isSwitch1Enabled, isSwitch2Enabled, isSwitch3Enabled,isSwitch4Enabled);
    setSwitch2Enabled(prevState2 => !prevState2);
  };
  const toggleSwitch4 = async () => {
    // if (!isSwitch4Enabled){
    //   try {
    //     const response = await fetch('http://192.168.1.23:3000/api/control/led-on', {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "topic": "led01"
    //       }),
    //     });
  
    //   } catch (error) {
    //     returns
    //   }
    // }else{
    //   try {
    //     const response = await fetch('http://192.168.1.23:3000/api/control/led-off', {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "topic": "led01"
    //       }),
    //     });
  
    //   } catch (error) {
    //     returns
    //   }
    // }
    NotificationScreen(!isSwitch1Enabled, isSwitch2Enabled, isSwitch3Enabled,isSwitch4Enabled);
    setSwitch4Enabled(prevState4 => !prevState4);
  };

  const {isDarkTheme, setIsDarkTheme} = useContext(AppContext);

  const [value, setValue] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newValue = Math.round((gestureState.moveX / barWidth) * 100);
        if (newValue >= 0 && newValue <= 100) {
          setValue(newValue);
        }
      },
    })
  ).current;



  const barWidth = 300;
  const segmentWidth = barWidth / 100;
  const segmentFilled = Math.round((value / 100) * barWidth);

  const handlePress = (event) => {
    const { locationX } = event.nativeEvent;
    const clickPosition = locationX;

    const newValue = Math.round((clickPosition / barWidth) * 100);
    if (newValue >= 0 && newValue <= 100) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0'); 
  const minutes = now.getMinutes().toString().padStart(2, '0'); 
  const seconds = now.getSeconds().toString().padStart(2, '0'); 
  setCurrentTime(`${hours}:${minutes}:${seconds}`);
}, 1000);

    // Lấy nhiệt độ hiện tại từ API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City&appid=${API_KEY}&units=metric`)
.then(response => response.json())
.then(data => {
  if (data.main && data.main.temp) {
    const temperature = parseInt(data.main.temp.toFixed(0)); // Làm tròn và chuyển sang số nguyên
    setCurrentTemperature(temperature);
  } else {
    console.error('Lỗi tìm nhiệt độ: Dữ liệu không có sẵn');
  }
})
.catch(error => console.error('Lỗi tìm nhiệt độ:', error));
  return () => clearInterval(interval);
  }, []);




  return (
    
    <ImageBackground source={IMAGES.BGR} resizeMode="stretch" style={styles.background}>
     {/* <View>
        <Switch
          value={isDarkTheme}
          onChange={() => {
            setIsDarkTheme(prev => !prev);
          }}
        />
      </View> */}
      <SafeAreaView style={styles.safeAreaView} >
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Xử lý dữ liệu backend */}
          <Text style={styles.text_f}>Xin chào, {username.toString()}</Text>
          <View style={styles.thermometerContainer}>
          <Text style={styles.text_f}>{currentTime}</Text>
            {/* <Image source={IMAGES.THERMOMETER} style={styles.thermometer} /> */}
            <Text style={styles.text_f}>{currentTemperature}°C</Text>
          </View>
        </View>

        <View style={styles.container_switch}>
        <View style={styles.bodySwitch1}>
        <View style={[styles.switchContainer1, styles.switchContainer]}>
            <Text style={styles.text}> Đèn Phòng khách </Text>
            <View style={styles.switchRow}>
              <Text style={styles.emoji}>💡</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isSwitch1Enabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isSwitch1Enabled}
              />
            </View>
          </View>
          <View style={[styles.switchContainer2, styles.switchContainer]}>
            <Text style={styles.text}> Quạt Phòng khách </Text>
            <View style={styles.switchRow}>
              <Text style={styles.emoji}>❄️</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isSwitch2Enabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isSwitch2Enabled}
              />
            </View>
          </View>
        </View>

        <View style={styles.bodySwitch}>
        <View style={[styles.switchContainer3, styles.switchContainer]}>
            <Text style={styles.text}> Đèn Phòng ngủ </Text>
            <View style={styles.switchRow}>
              <Text style={styles.emoji}>💡</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isSwitch3Enabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch3}
                value={isSwitch3Enabled}
              />
            </View>
          </View>
        <View style={[styles.switchContainer4, styles.switchContainer]}>
            <Text style={styles.text}> Quạt Phòng ngủ </Text>
            <View style={styles.switchRow}>
              <Text style={styles.emoji}>❄️</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isSwitch4Enabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch4}
                value={isSwitch4Enabled}
              />
            </View>
          </View>
        </View>
          <TouchableOpacity onPress={() => navigation.goBack}>
          <View style={[styles.switchAdd, styles.switchContainer]} >
            <Image source={IMAGES.PLUS} style={styles.plus}/>
          </View>
          </TouchableOpacity>

        </View>
        {/* ... */}
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    shadowColor: '#',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(126, 126, 126, 0.4)',
    
  },
  menu: {
    width: 24,
    height: 24,
    margin: 16,
    
  },
  container_switch:{
    borderColor: '#fff',
    borderWidth: 1,
    padding : 20,
    width: '95%',
    marginTop: 10,
    flexDirection: 'column'
  },
 
  container: {
    
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  switchAdd:{
    height: 85,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  header: {
    // alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(175, 238, 238)',
    width: '95%',
    height: 'auto',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
 
    },
    switchContainer3:{
      width: '48%',
      marginRight: 20,
    },
    switchContainer4: {
      width: '50%',
      
    },
    text_f:{
      fontSize: 24,
      marginHorizontal: 10,
      color: '#fff',
      fontStyle: 'normal'
    },
  thermometerContainer: {
    marginTop: 20,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  thermometer: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  bodySwitch1: {
    flexDirection: 'row',
  },
  bodySwitch: {
    flexDirection: 'row',
  },
  switchContainer: {
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgba(175, 238, 238, 0.8)',
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'dotted'
    },
    switchContainer1:{
      marginRight: 20,
    },
    
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    
  },
  emoji: {
    fontSize: 32,
    marginRight: 8,
  },
  plus: {
    height: 30,
    width: 30,
  },
});

export default HomeAppScreen;
