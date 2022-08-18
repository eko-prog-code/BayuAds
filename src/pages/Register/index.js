import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';

import FIREBASE from '../../config/FIREBASE';
import {colors, showError, storeData, useForm} from '../../utils';
import {InputData, Button, Header, Gap, Input} from '../../components';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const onContinue = () => {
    FIREBASE.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setForm('reset');
        const data = {
          fullName: form.fullName,
          mobileNumber: form.mobileNumber,
          email: form.email,
          password: form.password,
          uid: success.user.uid,
        };

        FIREBASE.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        navigation.replace('UploadPhoto', data);
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="contain"
            />
        <Text style={styles.title}>
         Bayukarta Mobile App Register
        </Text>
          <Gap height={24} />
          <Input
            label="Nama Lengkap"
            value={form.fullName}
            placeholder="MASUKAN NAMA LENGKAP"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={16} />
          <Input
            label="Nomor Handphone"
            value={form.mobileNumber}
            keyboardType="numeric"
            onChangeText={value => setForm('mobileNumber', value)}
            placeholder="MASUKAN NOMOR HANDHPONE"
            placeholderTextColor="#00A2E9"
          />
          <Gap height={16} />
          <Input
            label="Email"
            value={form.email}
            placeholder="MASUKAN EMAIL ANDA"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={16} />
          <Input
            label="Password"
            value={form.password}
            placeholder="MASUKAN PASSWORD"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('password', value)}
            secureTextEntry={!showPassword}
            right={!showPassword ? <IcEye /> : <IcEyeSlash />}
            onPressRight={() => setShowPassword(!showPassword)}
          />
          <Gap height={16} />
          <Button title="DAFTAR" textColor="white" onPress={onContinue} />

          <Gap height={30} />
          <Button
            type="secondary"
            title="Sudah punya Akun (MASUK)"
            onPress={() => navigation.replace('Login')}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingTop: 12,
  },
  content: {padding: 40, paddingTop: 0},
  searchInput: {
    color: '#00A2E9',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: '#36364A',
    fontSize: 18,
  }
});