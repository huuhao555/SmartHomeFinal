// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


// import { SafeAreaView } from 'react-native-safe-area-context';
// import IMAGES from '../../assets/images';

// const SmartScreen = ({ route, navigation }) => {
//   const { selectedText } = route.params || { selectedText: '' }; 
//   const [currentSelectedText, setCurrentSelectedText] = useState(selectedText);

//   const handleAddPress = () => {
//     navigation.navigate('ControlDevice');
    
    
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddPress}>
//           <Image source={IMAGES.PLUS} style={styles.image} />
//           <Text style={styles.text}>Add new </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.selectedTextView}>
//         <Text style={{ color: 'white', fontSize: 20 }}>{currentSelectedText}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     flexDirection: 'column', 
//     // alignItems: 'center', 
//     marginHorizontal: 10
//   },
//   button: {
//     marginVertical: 10, 
//     width: 100,
//     height: 100,
//     borderStyle: 'dotted',
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#008C8C',
//   },
//   selectedTextView: {
//     marginTop: 20, 
//     width: 100,
//     height: 100,
//     backgroundColor: '#008C8C',
//     color: 'white',
//     alignItems: 'center', 
//     justifyContent: 'center', 
//   },
//   text: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 16,
//     paddingTop: 50,
//     fontWeight: 'bold',
//   },
//   image: {
//     height: 25,
//     position: 'absolute',
//     width: 25,
//     top: 20,
//     left: 35,
//   },
// });

// export default SmartScreen;

import { View,Image, Text, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import IMAGES from '../../assets/images'
import { FONTS } from '../../constants'


const SmartScreen = () => {
  return (
    <ImageBackground source={IMAGES.BGR} resizeMode='stretch' style={styles.background}>
      <SafeAreaView style={{flex: 1}}>
      <View 
      style={{
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dotted',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
      }}>
        <TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: 'bold', fontFamil: FONTS.MONTSERRAT_BOLD, color: '#fff' }}>Thêm mới</Text>
        <Image source={IMAGES.PLUS} style={{height: 30, width: 30,marginLeft: 25, marginTop: 5, tintColor: '#fff' }}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default SmartScreen