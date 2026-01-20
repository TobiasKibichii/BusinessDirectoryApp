import { Image, View, Text, StyleSheet, TextInput } from 'react-native'
import {useUser} from '@clerk/clerk-expo'
import Colors from '@/services/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function Header() {

  const {user} = useUser();

  return (
    <View>
      <View style={{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop:10,
        
      }}>
        <View style={{
          display:'flex', 
          flexDirection:'row',
          alignItems:'center',
          gap:10,
          margin:5
          }}>

          <Image source={{uri: user?.imageUrl}} style={{
              width:40,
              height:40,
              borderRadius:99
          }}/>

        <View>
          <Text style={styles.heading}>Welcome,</Text>
          <Text style={[styles.heading, {fontFamily: 'appFontBold'}]}>{user?.firstName}</Text>
        </View>

        </View>

        <Image source={require('../../assets/images/bell.png')} 
          style={{
            width:25,
            height:25
          }}
        /> 
      </View>

      <View
        style={{
          flex:1,
          flexDirection:'row',
          alignItems:'center',
          gap:5,
          backgroundColor:Colors.WHITE,
          borderRadius:10,
          marginHorizontal:5,
          marginTop:10
        }}
      >
        <EvilIcons name="search" size={24} color="black" />
        <TextInput 
          placeholder='Search'
          style={styles.input}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'appFontSemiBold',
        fontSize:15,
    },
    input:{
      width:'100%', 
      outlineColor:'rgba(0,0,0,0)'
    }
})