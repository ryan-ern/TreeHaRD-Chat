import React, {Component,View,Button,StyleSheet,Text} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { render } from "react-dom";

const Header=(navigation)=>{

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var day = new Date().getDay();
      return (
        <View className='App-Header' style={styles.Header}>
          <View style={styles.title}>
            <Text id='title' style={styles.title}>Jadwal Sholat     <FontAwesome5 name="mosque" size={24} color="black" /></Text>
          </View>
          
          <View >
          <Text id="date" style={styles.date}>{days[day]},{date}-{month}-{year}</Text>
          </View>
          
          
        </View>

      )

}


export default Header;


const styles = StyleSheet.create({

  Header:{
    backgroundColor: '#00c04b',
    flexdirection: 'row',
    fontsize: 'large',
    fontweight: 'bolder',
    textalign: 'left',
    border: 'solid',
    borderColor:'black',
    marginTop:50,
    height:50,
    position:'relative'

  },



title:{
    fontSize:21,
    float: 'left',
    border: 'solid',
    borderColor: '#fff',
    backgroundcolor:'#fff',
    position:'absolute',
    padding:7
},

date:{
  float: 'right',
  justifycontent:'right',
  position: 'absolute',
  border: 'solid',
  right:0,
  fontSize:17,
  textAlign:'center',
  alignContent:'center',
  padding:10,


},



  

});