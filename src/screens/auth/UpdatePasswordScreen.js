import React, {useState} from 'react';
import {KeyboardAvoidingView, Text} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {TextInput} from 'react-native';
import CustomInput from '../../components/CustomInput'; 
import CustomButton from '../../components/CustomButton';
import {TouchableWithoutFeedback} from 'react-native';
import {View} from 'react-native';
import Foect from 'foect';
import {Alert} from 'react-native';
import SCREENS from '..';
import { apiLink } from '../../header/url';
import SessionStorage from 'react-native-session-storage';

const UpdatePasswordScreen = props => {
  
  
  const [passwordNew, setPasswordNew] = useState("");
  const [password, setPassword] = useState("");
  
  const {navigation} = props;

  const onSignUpPressed = async () => {
    // const emailRegex = /\S+@\S+\.\S+/;
    
    
    const token = await SessionStorage.getItem('@storage_key');
    console.log(token)
    try {
      const response = await fetch(apiLink + '/api/user/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "oldPassword": password,
          "newPassword": passwordNew
        }),
      });
  
      navigation.navigate(SCREENS.LOGIN);
    } catch (error) {
      console.log(error)
    }
    // try {
    //   const response = await fetch( apiLink +'/api/auth/register', {
    //     const response = await fetch('http://192.168.1.23:3000/api/auth/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "name": userName,
    //         "email": userEmail,
    //         "password": password,
    //         "phoneNumber": phone
    //     }),
    //   });

    //   if (!response.ok) {
    //     alert("Đăng ký không thành công! Vui lòng kiểm tra lại thông tin.");
    //     return;
    //   }
    //   const data = await response.json();
    //   console.log('Login successful:', data);//
      
    //   navigation.navigate(SCREENS.CONFIRMEMAIL);
    // } catch (error) {
    //   alert("Đăng ký không thành công! Vui lòng kiểm tra lại thông tin.");
    // }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null} >
      <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
   
      <Foect.Form
        onValidSubmit={model => {
          
        }}>
        {form => (
          <View>
           
            
            <Foect.Control
              name="passwordNew"
              passnew
              pattern={
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              }>
              {control => (
                <View style={{marginTop: 20}}>
                  <TextInput
                    style={{
                      backgroundColor: COLORS.WHITE,
                      height: 50,
                      maxHeight: 50,
                      minHeight: 50,
                      fontSize: 16,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      fontFamily: FONTS.MONTSERRAT,
                    }}
                    placeholder="Mật khẩu cũ"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.MAIN}
                    selectionColor={COLORS.MAIN}
                    
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />{
                    setPassword(control.value)
                  }
                  
                  
                </View>
              )}
            </Foect.Control>
            <Foect.Control
              name="password"
              required
              pattern={
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              }>
              {control => (
                <View style={{marginTop: 20}}>
                  <TextInput
                    style={{
                      backgroundColor: COLORS.WHITE,
                      height: 50,
                      maxHeight: 50,
                      minHeight: 50,
                      fontSize: 16,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      fontFamily: FONTS.MONTSERRAT,
                    }}
                    placeholder="Mật khẩu mới"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.ORANGE}
                    selectionColor={COLORS.ORANGE}
                    onBlur={control.markAsTouched}
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />{
                    setPasswordNew(control.value)
                  }
                  {control.isInvalid && control.errors.required && (
                    <Text style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                      Vui lòng nhập mật khẩu
                    </Text>
                  )}
                  {control.isInvalid &&
                    !control.errors.required &&
                    control.errors.pattern && (
                      <Text
                        style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Mật khẩu phải chứa tối thiểu 8 ký tự, 
                        Ít nhất một chữ cái viết hoa, một chữ cái viết thường, 
                        số và một ký tự đặc biệt
                      </Text>
                    )}
                </View>
              )}
            </Foect.Control>
            <Foect.Control
              name="confirm_password"
              required
              equalToControl="password">
              {control => (
                <View style={{marginTop: 20}}>
                  <TextInput
                    style={{
                      backgroundColor: COLORS.WHITE,
                      height: 50,
                      maxHeight: 50,
                      minHeight: 50,
                      fontSize: 16,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      fontFamily: FONTS.MONTSERRAT,
                      marginBottom: 20,
                    }}
                    placeholder="Nhập lại mật khẩu mới"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.ORANGE}
                    selectionColor={COLORS.ORANGE}
                    onBlur={control.markAsTouched}
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />
                  {control.isInvalid && control.errors.required && (
                    <Text style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                      Vui lòng nhập lại mật khẩu
                    </Text>
                  )}
                  {control.isInvalid &&
                    !control.errors.required &&
                    control.errors.equalToControl && (
                      <Text
                        style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Mật khẩu không khớp
                      </Text>
                    )}
                </View>
              )}
            </Foect.Control>
            
              <CustomButton 
             
                onPress={onSignUpPressed} 
                bgColor={COLORS.MAIN}
                text="Đăng ký " 
              />
                  
          </View>
        )}
      </Foect.Form>
     
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default UpdatePasswordScreen;
