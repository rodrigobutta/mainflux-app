import React from 'react';
import {
	StyleSheet,
	View,
	Image
} from 'react-native';


const ContainedImage = props => {
  return (
    <View style={styles.imageContainer}>
      <Image  style={styles.styledImage} resizeMode="contain" {...props} />
    </View>
  );
};

export default ContainedImage;



const styles = StyleSheet.create({	
  styledImage: {
		position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  imageContainer: {
		flex: 1,
    alignItems: 'stretch'
	}
});

