import React, { useState} from 'react';
import {Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {TextInput} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {View} from 'react-native';
import Foect from 'foect';
import {Alert} from 'react-native';
import SCREENS from '..';
import { apiLink } from '../../header/url';


const ConfirmLoginScreen = props => {
  const [otpUser, setOTPUser] = useState("");

  const {navigation} = props;

  const onOTPPressed = async () => {
    
    if (!otpUser) {
      alert("Vui lòng nhập đúng cú pháp.");
      return;
    }
  
    if (!(otpUser.length == 6)){
      alert("Vui lòng nhập đúng cú pháp.");
      return;
    }

    try {
      const response = await fetch(apiLink + '/api/auth/verify-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "otpCode": otpUser
        }),
      });

      if (!response.ok) {
        alert("Xác thực thất bại! Vui lòng kiểm tra mã xác thực.");
        return;
      }
      const data = await response.json();
      console.log('Login successful:', data);//

      if (!data){
        alert("Xác thực thất bại! Vui lòng kiểm tra mã xác thực.");
        return;
      }

      navigation.navigate(SCREENS.HOME);

    } catch (error) {
      alert("Xác thực thất bại! Vui lòng kiểm tra mã xác thực.");
    }
  };


  return (
    <KeyboardAvoidingView 
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}>
<SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          marginTop: 60,
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT_BOLD,
          fontSize: 24,
        }}>
        XÁC NHẬN TÀI KHOẢN
      </Text>
      
      <Foect.Form
        onValidSubmit={model => {
          Alert.alert('Payload', JSON.stringify(model));
        }}>
        {form => (
          <View>
            <View style={{flexDirection: 'row', marginTop: 50}}>
      
              
            </View>

            
            <Foect.Control 
            name="mobile" required pattern={/^[0-9]{10}/}>
                {control => (
                  <View>
                    {/* <TextInput
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
                      placeholder="Mã xác nhận"
                      placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                      cursorColor={COLORS.ORANGE}
                      selectionColor={COLORS.ORANGE}
                      onBlur={control.markAsTouched}
                      onChangeText={text => control.onChange(text)}
                      value={control.value}
                    />
                    
                    {control.isInvalid && control.errors.required && (
                      <Text style={{marginTop: 5, marginStart: 5, color: 'red'}}>
                        Vui lòng nhập mã xác nhận
                      </Text>
                    )} */}
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
                    placeholder="Mã xác nhận"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.ORANGE}
                    selectionColor={COLORS.ORANGE}
                    value={otpUser}
                    setValue={setOTPUser}
                  />
                  </View>
                )}
              </Foect.Control>
            
              <CustomButton 
                onPress={onOTPPressed} 
                bgColor={COLORS.MAIN}
                text="Xác nhận " 
              />
          </View>
        )}

      </Foect.Form>
      
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    
  );
};

export default ConfirmLoginScreen;
