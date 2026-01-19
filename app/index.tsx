import Colors from "@/services/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {

  const navigation = useNavigation();

  useEffect (() =>{
    navigation.setOptions({
      headerShown:false
    })
  }, [])

  return (
    <View
      style={styles.container}
    >
      <Image source={require('./../assets/images/welcome.png')}
        style ={{width: '100%', height: 300, marginTop: 20, resizeMode: 'contain'}}
      />

      <Text style={styles.heading}>Welcome To</Text>
      <Text style={styles.heading}>Business Directory App</Text>

      <View
        style={{backgroundColor: Colors.WHITE, margin: 20,
        padding:20, borderRadius: 10}}
      >
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15}}>Discover thousands of local businesses in one place.</Text>

        <View style ={[styles.button, {display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:10}]}>
          <Image source={require('../assets/images/google.png')}
          style={{width:20, height:20}}
          />
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15}}>Sign In With Google</Text>
      </View>
        <View style ={[styles.button, {backgroundColor:Colors.PRIMARY}]}>
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15, color:'white'}}>Skip</Text>
      </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.PRIMARY,
    height: '100%'
  },
  heading: {
    color:Colors.WHITE,
    fontSize: 25,
    fontFamily: 'appFontBold',
    textAlign: 'center',
  },
  button:{
    borderWidth:1,
    borderRadius:99,
    padding:4,
    marginTop:15
  }
})
