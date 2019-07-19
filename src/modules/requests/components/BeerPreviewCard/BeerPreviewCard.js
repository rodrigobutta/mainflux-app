import React from 'react';
import {
	StyleSheet,
  View,
  Text
} from 'react-native';


// app theme colors
// import { colors } from '../../config/theme';

// components
// import Title from '../Title';
import ContainedImage from '../ContainedImage';


const BeerPreviewCard = ({ name, imageUrl }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <ContainedImage source={{ uri: imageUrl }} />
      </View>
      <View style={styles.nameContainer}>
        <Text align="center" style={styles.title}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default BeerPreviewCard;




const styles = StyleSheet.create({
	cardContainer: {
		height: 160,
    width: '85%',
    left: '7.5%',
    justifyContent: 'space-around'
  },
  nameContainer: {
		height: '30%',
    backgroundColor: '#00f',
    justifyContent: 'center'
  },
  imageContainer: {
		flex: 1,
    alignItems: 'stretch'
  },
  title: {
		fontFamily: 'robotoRegular',
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    textAlign: 'left',
    alignSelf: 'center'
	}
});

