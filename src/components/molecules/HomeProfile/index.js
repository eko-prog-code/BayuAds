import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, getData} from '../../../utils';
import {ILNullPhoto} from '../../../assets';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const HomeProfile = ({onPress}) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  }, []);

  return (
    <View style={styles.boxImage} >
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Image source={profile.photo} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.name} numberOfLines={1}>{profile?.fullName}</Text>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  boxImage: { alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 66 / 2,marginTop: 12, alignItems: 'center', justifyContent: 'center' },
  name: {
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
    color: '#1908DD',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 2,
  },
});
