import React, { useState}  from 'react';
import {KeyboardAvoidingView, ScrollView, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {TextInput} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {View} from 'react-native';
import Foect from 'foect';
import {Alert} from 'react-native';
import SCREENS from '..';
import CustomButton from '../../components/CustomButton';
import { apiLink } from '../../header/url';
import IMAGES from '../../assets/images';


const ForgotPasswordScreen = props => {
  const [username, setUsername] = useState("");
  const {navigation} = props;

  const forgotPasswordPressed = async () => {
    
    alert('Mật khẩu mới đã được gửi về Email của bạn');
    navigation.navigate(SCREENS.LOGIN)
    console.log(apiLink +'/api/user/reset-password');
    try {
      const response = await fetch( apiLink +'/api/user/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": username
        }),
      });

      navigation.navigate(SCREENS.LOGIN);

    } catch (error) {
      alert(" Vui lòng kiểm tra Email ");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}>
      <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          marginTop: 50,
          textAlign: 'center',
          fontFamily: FONTS.MONTSERRAT_BOLD,
          fontSize: 24,
        }}>
        Lấy lại mật khẩu
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
      <Foect.Form
        onValidSubmit={model => {
          
        }}>
        {form => (
          <View>
            <View style={{flexDirection: 'row'}}>
              
              
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
                      marginBottom: 20,
                    }}
                    placeholder="Email"
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    cursorColor={COLORS.MAIN}
                    selectionColor={COLORS.MAIN}
                    onBlur={control.markAsTouched}
                    onChangeText={text => control.onChange(text)}
                    value={control.value}
                  />{
                    setUsername(control.value)
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
            
            <TouchableWithoutFeedback 
            onPress={() => {
              if (form.isValid) { 
                form.submit(); 
              } else {
                Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
              }

            }}>
               <CustomButton 
                onPress={forgotPasswordPressed} 
                bgColor={COLORS.MAIN}
                text="Lấy mật khẩu " 
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </Foect.Form>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
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

export default ForgotPasswordScreen;
