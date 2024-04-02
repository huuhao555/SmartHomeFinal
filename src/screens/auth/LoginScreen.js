import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS, FONTS} from '../../constants';
import IMAGES from '../../assets/images';
import SCREENS from '..';
import {AppContext} from '../../theme/AppContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useTheme} from '@react-navigation/native';

import SessionStorage from 'react-native-session-storage';
import { apiLink } from '../../header/url';

const LoginScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSignInPressed = async () => {
    
    if (!username) {
      alert( 'Thông báo: Vui lòng nhập Email.');
      return;
    }
  
    if (!password) {
      alert('Thông báo: Vui lòng nhập mật khẩu.');
      return;
    }
    
    try {
      const response = await fetch( apiLink +'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": username,
          "password": password
        }),
      });

      if (!response.ok) {
        Alert.alert('Thông báo',"Đăng nhập không thành công, vui lòng kiểm tra Email và Mật khẩu.");
        return;
      }
      const data = await response.json();
      console.log('Login successful:', data);//

      if (data.loginUser == "Wrong password !"){
        Alert.alert('Thông báo', "Đăng nhập không thành công, vui lòng kiểm tra Email và Mật khẩu.");
        return;
      }

      SessionStorage.setItem('@storage_key', data.loginUser.token);
      
      
      navigation.navigate(SCREENS.CONFIRMLOGIN);

    } catch (error) {
      alert("Đăng nhập không thành công, vui lòng kiểm tra Email và Mật khẩu.");
    }
  };

 
  const {navigation} = props;

  const {colors} = useTheme();

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          marginTop: 60,
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT_BOLD,
          fontSize: 24,
          color: colors.text,
        }}>
        XIN CHÀO!
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT,
          fontSize: 20,
          marginTop: 20,
          marginHorizontal: 50,
          color: colors.text,
        }}>
        Chào mừng bạn đến với Smart Home 
      </Text>
      <Image 
        source={IMAGES.LOGO} 
        style={{
          width: 200, 
          height: 200, 
          marginLeft: 70, 
          marginTop: 30, 
          marginBottom: 30, 
          borderRadius: 10,
          }}/>
      <CustomInput
        style={{
          backgroundColor: COLORS.WHITE,
          height: 50,
          maxHeight: 50,
          minHeight: 50,
          fontSize: 16,
          borderRadius: 10,
          paddingHorizontal: 20,
          marginTop: 50,
          fontFamily: FONTS.MONTSERRAT,
        }}
        placeholder="Email"
        placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
        cursorColor={COLORS.MAIN}
        selectionColor={COLORS.MAIN}
        value={username}
        setValue={setUsername}
        errorMessage={usernameError}
      />
      <CustomInput
        style={{
          backgroundColor: COLORS.WHITE,
          height: 50,
          maxHeight: 50,
          minHeight: 50,
          fontSize: 16,
          borderRadius: 10,
          paddingHorizontal: 20,
          marginTop: 50,
          fontFamily: FONTS.MONTSERRAT,
        }}
        placeholder="Mật khẩu"
        placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
        cursorColor={COLORS.MAIN}
        selectionColor={COLORS.MAIN}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        errorMessage={passwordError}
      />
      
      <TouchableWithoutFeedback
          onPress={() => navigation.navigate(SCREENS.FORGOTPASS)}>
          <Text
            style={{
            fontFamily: FONTS.MONTSERRAT,
            textAlign: 'right',
            marginTop: 5,
            marginBottom: 10,
            marginStart: 5,
            fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
           
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableWithoutFeedback>
      <CustomButton 
        onPress={onSignInPressed} 
        bgColor={COLORS.MAIN}
        text="Đăng nhập"
        
      />
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text style={{fontFamily: FONTS.MONTSERRAT_MEDIUM, color: colors.text}}>
          Chưa có tài khoản?
        </Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(SCREENS.SIGNUP)}>
          <Text
            style={{
              marginStart: 5,
              fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
              color: '#76D7C4',
            }}>
            Đăng ký tại đây
          </Text>
        </TouchableWithoutFeedback>
      </View>
      </ScrollView>
      
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;