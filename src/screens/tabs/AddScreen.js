import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet,Pressable } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { COLORS, FONTS } from '../../constants';
const Table = () => {
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleAddContact = () => {
    if (email) {
      const newContact = {
        id: contacts.length + 1,
        name: 'Phan Hao', 
        email: email,
        phone: '0123456789' 
      };
      setContacts([...contacts, newContact]);
      setEmail('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactItemText}>{item.id}</Text>
      <Text style={styles.contactItemText}>{item.name}</Text>
      <Text style={styles.contactItemText}>{item.email}</Text>
      <Text style={styles.contactItemText}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, marginBottom: 10}}>Thêm thành viên: </Text>
      <CustomInput
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        setValue={setEmail}
        
      />
      <Pressable 
    onPress={handleAddContact}
    style={{
      width: '50%',
        marginLeft: 85,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.MAIN
    }
    }>
      <Text 
      style={{
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18
      }}>
            Thêm thành viên
        </Text>
        </Pressable>
      
      
      <FlatList style={styles.list}
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contactItemText: {
    flex: 1,
    marginRight: 8,
  },
  list:{
    color: 'red',
    backgroundColor: '#ccc'
  }
});

export default Table;