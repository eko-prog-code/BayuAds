import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

import ImageCropPicker from 'react-native-image-crop-picker';
import FIREBASE from '../../config/FIREBASE';
import {
  colors,
  isInTheFuture,
  isInThePast,
  showError,
  storeData,
  useForm,
} from '../../utils';
import {
  InputData,
  Button,
  DatePicker,
  Header,
  Gap,
  Input,
  HeaderAppo,
  Picker,
} from '../../components';
import {getData} from '../../utils';

export default class Appoitement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namaAkun: '',
      nama: '',
      tanggalLahir: '',
      noWa: '',
      penjamin: '',
      klinik: '',
      dokter: '',
      tanggalKehadiran: '',
      jamKehadiran: '',
      showBirthDate: false,
      showPresentDate: false,
      showPresentClock: false,
      openKlinik: false,
      valueKlinik: null,
      itemsKlinik: [],

      openDokter: false,
      valueDokter: null,
      itemsDokter: [],
      gambarForDB: '',
      gambar: '',
    };
  }

  getKlinik() {
    FIREBASE.database()
      .ref('klinik')
      .once('value')
      .then(res => {
        const data = res.val();
        const filteredData = [];

        data.filter(
          item =>
            item !== undefined &&
            filteredData.push({label: item.name, value: item.value}),
        );

        this.setState({itemsKlinik: filteredData});
      });
  }

  getDokter(specialist) {
    FIREBASE.database()
      .ref('dokter')
      .once('value')
      .then(res => {
        const data = res.val();
        const filteredData = [];

        data.filter(
          item =>
            item !== undefined &&
            filteredData.push({
              label: item.name,
              value: item.value,
              specialist: item.specialist,
            }),
        );

        const foundDocter = filteredData.filter(
          item => item.specialist === specialist,
        );

        this.setState({itemsDokter: foundDocter});
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  componentDidMount() {
    this.getUserData();
    this.getKlinik();
  }

  getUserData = async () => {
    const userData = await getData('user');
    this.setState({
      ...this.state,
      namaAkun: userData?.fullName,
      uid: userData?.uid,
    });
  };

  uploadPhoto = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        const source = {uri: image.path};
        console.log(source);
        this.setState({
          ...this.state,
          gambarForDB: `data:${image.mime};base64,${image.data}`,
          gambar: source,
        });
        Alert.alert('Berhasil Uploud KTP');
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmit = () => {
    if (
      this.state.namaAkun &&
      this.state.nama &&
      this.state.tanggalLahir &&
      this.state.noWa &&
      this.state.penjamin &&
      this.state.valueKlinik &&
      this.state.valueDokter &&
      this.state.tanggalKehadiran &&
      this.state.jamKehadiran &&
      this.state.gambarForDB
    ) {
      const appoitmentReferensi = FIREBASE.database().ref('appoitment');
      const appoitment = {
        uid: this.state.uid,
        namaAkun: this.state.namaAkun,
        nama: this.state.nama,
        tanggalLahir: this.state.tanggalLahir,
        noWa: this.state.noWa,
        penjamin: this.state.penjamin,
        klinik: this.state.valueKlinik,
        dokter: this.state.valueDokter,
        tanggalKehadiran: this.state.tanggalKehadiran,
        jamKehadiran: this.state.jamKehadiran,
        gambar: this.state.gambarForDB,
      };

      appoitmentReferensi
        .push(appoitment)
        .then(data => {
          Alert.alert('Sukses', 'Appoitment berhasil di simpan');
          this.props.navigation.replace('MainApp');
        })
        .catch(error => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Form wajib di isi semua');
    }
  };

  render() {
    console.log(this.state.gambar);
    const {
      tanggalKehadiran,
      jamKehadiran,
      showBirthDate,
      showPresentDate,
      showPresentClock,
      openKlinik,
      valueKlinik,
      itemsKlinik,
      openDokter,
      valueDokter,
      itemsDokter,
    } = this.state;

    return (
      <View>
        <View>
          <Image
            source={require('../../assets/headerForm.png')}
            style={{width: '100%', height: 124}}
            resizeMode="contain"
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ScrollView style={styles.pages}>
              <InputData
                label="Nama Akun"
                placeholder="Masukkan Nama Akun"
                onChangeText={this.onChangeText}
                value={this.state.namaAkun}
                namaState="namaAkun"
              />
              <Gap height={6} />
              {this.state.gambar ? (
                <Image source={this.state.gambar} style={styles.photo} />
              ) : (
                <View />
              )}
              <TouchableOpacity
                style={styles.tombol}
                onPress={() => this.uploadPhoto()}>
                <Text style={styles.textTombol}>Upload KTP pemilik Akun</Text>
              </TouchableOpacity>
              <Gap height={10} />
              <InputData
                label="Nama Pasien"
                placeholder="Masukkan Nama Pasien (Nama Anda/ Nama keluarga Anda)"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.nama}
                namaState="nama"
              />
              <Gap height={10} />
              <InputData
                label="Tanggal Lahir Pasien"
                placeholder="Pilih Tanggal Lahir Pasien"
                onChangeText={this.onChangeText}
                value={this.state.tanggalLahir}
                namaState="tanggalLahir"
                RightComponent={
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={colors.black}
                    onPress={() => this.setState({showBirthDate: true})}
                  />
                }
              />
              <Gap height={10} />
              <InputData
                label="No WhatsApp yang bisa di hubungi"
                placeholder="Masukkan No Whatsapp"
                keyboardType="number-pad"
                onChangeText={this.onChangeText}
                value={this.state.noWa}
                namaState="noWa"
              />
              <Gap height={10} />
              <InputData
                label="Penjamin"
                placeholder="Umum"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.penjamin}
                namaState="penjamin"
              />
              <Gap height={10} />
              <Picker
                label="Klinik Yang dituju"
                placeholder={'Pilih Klinik'}
                open={openKlinik}
                value={valueKlinik}
                items={itemsKlinik}
                setOpen={value => this.setState({openKlinik: value})}
                setValue={value => {
                  this.setState({valueKlinik: value(), valueDokter: null});

                  this.getDokter(value());
                }}
                setItems={value => console.log('items: ', value)}
                zIndex={openKlinik ? 999 : 998}
                placeholderColor={'gray'}
                pickerStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 5,
                }}
              />
              {/* <InputData
                label="Klinik Yang di tuju"
                placeholder="Masukkan klinik yang di tuju"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.klinik}
                namaState="klinik"
              /> */}
              <Gap height={10} />
              {valueKlinik && (
                <Picker
                  label="Dokter Yang dituju"
                  placeholder={'Pilih Dokter'}
                  open={openDokter}
                  value={valueDokter}
                  items={itemsDokter}
                  setOpen={value => this.setState({openDokter: value})}
                  setValue={value => this.setState({valueDokter: value()})}
                  setItems={value => console.log('items: ', value)}
                  zIndex={openDokter ? 999 : 998}
                  placeholderColor={'gray'}
                  pickerStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 5,
                  }}
                />
              )}

              {/* <InputData
                label="Dokter yang di tuju"
                placeholder="Masukkan Dokter yang di tuju"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.dokter}
                namaState="dokter"
              /> */}
              <Gap height={10} />
              <InputData
                label="Tanggal & Waktu (Jam) Kehadiran"
                placeholder="Pilih Tanggal dan Jam kehadiran"
                // isTextArea={true}
                onChangeText={this.onChangeText}
                value={
                  tanggalKehadiran && jamKehadiran
                    ? `${tanggalKehadiran}, ${jamKehadiran}`
                    : ''
                }
                namaState="tanggalKehadiran"
                RightComponent={
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={colors.black}
                    onPress={() => this.setState({showPresentDate: true})}
                  />
                }
              />
              <Gap height={10} />
              <TouchableOpacity
                style={styles.tombol}
                onPress={() => this.onSubmit()}>
                <Text style={styles.textTombol}>KIRIM</Text>
              </TouchableOpacity>
              <Gap height={100} />
            </ScrollView>
          </View>
          <Gap height={40} />
        </ScrollView>
        {showBirthDate && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={e => {
              this.setState({showBirthDate: false});

              if (e.type === 'set') {
                const date = moment(e.nativeEvent.timestamp).format(
                  'DD MMMM YYYY',
                );

                if (isInTheFuture(new Date(e.nativeEvent.timestamp)))
                  return ToastAndroid.show(
                    'Tanggal yang anda pilih tidak sesuai!',
                    ToastAndroid.SHORT,
                  );

                this.setState({tanggalLahir: date});
              }
            }}
          />
        )}

        {showPresentDate && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={e => {
              this.setState({showPresentDate: false});

              if (e.type === 'set') {
                const date = moment(e.nativeEvent.timestamp).format(
                  'DD MMMM YYYY',
                );

                if (isInThePast(new Date(e.nativeEvent.timestamp)))
                  return ToastAndroid.show(
                    'Tanggal yang anda pilih tidak sesuai!',
                    ToastAndroid.SHORT,
                  );

                this.setState({tanggalKehadiran: date, showPresentClock: true});
              }
            }}
          />
        )}

        {showPresentClock && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            onChange={e => {
              this.setState({showPresentClock: false});

              if (e.type === 'set') {
                const currDate = new Date(e.nativeEvent.timestamp).toString();
                const hour = currDate.split(' ')[4].split(':')[0];
                const minute = currDate.split(' ')[4].split(':')[1];
                const clock = `${hour}:${minute}`;

                this.setState({jamKehadiran: clock});
              }
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  pages: {
    margin: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  tombol: {
    backgroundColor: '#0BCAD4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  photo: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: '100%',
  },
});
