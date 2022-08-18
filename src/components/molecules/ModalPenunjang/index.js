import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import IcEye from '../../../assets/icons/eye.svg';
import IcEyeSlash from '../../../assets/icons/eye-slash.svg';
import {Button, Gap, Input} from '../..';
import {colors} from '../../../utils';

const ModalPenunjang = ({visible, onSubmit, profile, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = () => {
    setLoading(true);
    if (password === String(profile?.penunjangPassword)) {
      navigation.navigate('PenunjangUser', {
        profile,
      });
      onSubmit && onSubmit(password);
      setPassword('');
    } else {
      Alert.alert('Salah password');
    }
    setLoading(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
     <StatusBar barStyle="dark-content" backgroundColor={'rgba(0,0,0,0.5)'} hidden={false} />
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onClose && onClose()}
            style={{alignSelf: 'flex-end', marginRight: 4}}>
            <Text style={{color: 'black', fontSize: 24}}>X</Text>
          </TouchableOpacity>
          <Input
            value={password}
            onChangeText={val => setPassword(val)}
            label={'Password'}
            isDark
            secureTextEntry={!showPassword}
            right={!showPassword ? <IcEye /> : <IcEyeSlash />}
            onPressRight={() => setShowPassword(!showPassword)}
          />
          <Gap height={20} />
          <Text style={styles.textInfo}>
            Harap hubungi Admin untuk mendaftar apabila belum mempunyai password
            akses
          </Text>
          <Gap height={20} />
          <Button
            disable={password === '' || loading}
            onPress={() => {
              handleSubmit();
            }}
            title={'Lanjutkan'}
          />
          <Gap height={8} />
          <Button
            onPress={() => Linking.openURL('https://wa.me/+628111199968')}
            type="secondary"
            title={'Hubungi Admin'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPenunjang;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.loadingBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 5,
    padding: 12,
  },
  textInfo: {
    color: colors.black,
  },
});