import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ListView,
  Image,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const MainMenuItem = ({ navigation, icon, label, screen }) =>
  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(screen)} >
    <Icon name={icon} size={25} color="#333" style={{margin:15}} />
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>


const styles = StyleSheet.create({
  menuItem: {
    flexDirection:'row'
  },
  menuItemText: {
    fontSize:15,
    fontWeight:'300',
    margin:15,
  }
})

export default MainMenuItem