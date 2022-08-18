import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, getData} from '../../../utils';
import {ILNullPhoto} from '../../../assets';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  }, []);

  return (
    <View>
      <Image source={profile.photo} style={styles.avatar} />
      <Text style={styles.name}>{profile?.fullName}</Text>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1},
  avatar: {width: 66, height: 66, borderRadius: 66 / 2, marginRight: 12},
  name: {
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
    color: '#1908DD',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    alignContent: 'center',
    alignItems: 'center',
  },
});
