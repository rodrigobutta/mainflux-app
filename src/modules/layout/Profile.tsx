import React from 'react'
import { View, Text, Image } from 'react-native'
// import Icon from 'react-native-vector-icons/MaterialIcons'

const Profile = ({ avatar, username, email }) =>
  <View style={{flexDirection:'row', padding:10}}>
	{/* <Image source={{uri: avatar}}  style={{margin:10, width:60, height:60, borderRadius:60}} /> */}
	<Image source={{ uri: avatar }}  style={{margin:10, width:60, height:60, borderRadius:60}} />
  	<View style ={{justifyContent:'center', margin:10}}>
    	<Text style={{fontWeight:'700', fontSize:22, color:'#444'}}>{username}</Text>
    	<Text style={{fontWeight:'200', color:'#999'}}>{email}</Text>
  	</View>
  </View>


export default Profile