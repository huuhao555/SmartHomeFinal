import React, {useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
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


const SignupScreen = props => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const {navigation} = props;

  const onSignUpPressed = async () => {
    // const emailRegex = /\S+@\S+\.\S+/;
    
    if ((!userName) || (!userEmail) || (!password) || (!phone)) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    
    try {
      const response = await fetch( apiLink +'/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": userName,
            "email": userEmail,
            "password": password,
            "phoneNumber": phone
        }),
      });

      if (!response.ok) {
        alert("Đăng ký không thành công! Vui lòng kiểm tra lại thông tin.");
        return;
      }
      const data = await response.json();
      console.log('Login successful:', data);//
      
      navigation.navigate(SCREENS.CONFIRMEMAIL);
    } catch (error) {
      alert("Đăng ký không thành công! Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (

    <KeyboardAvoidingView 
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          marginTop: 40,
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT_BOLD,
          fontSize: 24,
        }}>
        XIN CHÀO!
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT,
          fontSize: 20,
          marginTop: 20,
          marginHorizontal: 30,
        }}>
        Chào mừng bạn là thành viên mới của Smart Home NHÓM 4
      </Text>
      <Foect.Form
        onValidSubmit={model => {
          
        }}>
        {form => (
          <View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Foect.Control
                name="first_name"
                required
                minLength={2}
                maxLength={32}>
                {control => (
                  <View style={{flex: 1, marginEnd: 5}}>
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
                      placeholder="Họ và Tên"
                      placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                      cursorColor={COLORS.MAIN}
                      selectionColor={COLORS.MAIN}
                      onBlur={control.markAsTouched}
                      onChangeText={text => control.onChange(text)}
                      value={control.value}
                    />{
                      setUserName(control.value)
                    }
                    {control.isInvalid && control.errors.required && (
                      <Text
                        style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Vui lòng nhập Họ và tên
                      </Text>
                    )}
                    {control.isInvalid &&
                      !control.errors.required &&
                      control.errors.minLength && (
                        <Text
                          style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                          Kích thước quá ngắn, tối thiểu 2 ký tự
                        </Text>
                      )}
                    {control.isInvalid && control.errors.maxLength && (
                      <Text
                        style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Kích thước quá dài, tối đa 24 ký tự
                      </Text>
                    )}
                  </View>
                )}
              </Foect.Control>
              
            </View>
            <Foect.Control name="email" required email>
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
                    placeholder="Email"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.MAIN}
                    selectionColor={COLORS.MAIN}
                    onBlur={control.markAsTouched}
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />{
                    setUserEmail(control.value)
                  }
                  {control.isInvalid && control.errors.required && (
                    <Text style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                      Vui lòng nhập Email
                    </Text>
                  )}
                  {control.isInvalid &&
                    !control.errors.required &&
                    control.errors.email && (
                      <Text
                        style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Email không hợp lệ
                      </Text>
                    )}
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
                    placeholder="Mật khẩu"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.MAIN}
                    selectionColor={COLORS.MAIN}
                    onBlur={control.markAsTouched}
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />{
                    setPassword(control.value)
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
                    }}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.MAIN}
                    selectionColor={COLORS.MAIN}
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
            <Foect.Control 
            name="mobile" required pattern={/^[0-9]{10}/}>
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
                        marginBottom: 20,
                        fontFamily: FONTS.MONTSERRAT,
                      }}
                      placeholder="Số điện thoại"
                      placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                      cursorColor={COLORS.MAIN}
                      selectionColor={COLORS.MAIN}
                      onBlur={control.markAsTouched}
                      onChangeText={text => control.onChange(text)}
                      value={control.value}
                    />{
                      setPhone(control.value)
                    }
                    {control.isInvalid && control.errors.required && (
                      <Text style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Vui lòng nhập số điện thoại
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
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
        <Text style={{fontFamily: FONTS.MONTSERRAT_MEDIUM}}>
          Bạn đã có tài khoản?
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Text
            style={{
              marginStart: 5,
              fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
              color: '#76D7C4',
            }}>
            Đăng nhập
          </Text>
        </TouchableWithoutFeedback>
      </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    
  );
};

export default SignupScreen;
