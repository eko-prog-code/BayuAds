import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, getData} from '../../../utils';
import {ILUsernull} from '../../../assets';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILUsernull,
    fullName: '',
    profession: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('user')
      .then(res => {
        const data = res;
        data.photo = {uri: res.photo};
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <Image source={profile.photo} style={styles.avatar} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1},
  avatar: {width: 66, height: 66, borderRadius: 66 / 2, marginRight: 12},
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
    color: '#F8C471',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
