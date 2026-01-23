import { Image, View, Text, StyleSheet } from 'react-native'
import { BusinessType } from '../Homescreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/services/Colors';

type Props={
    business:BusinessType
}

export default function BusinessInfo({business}:Props) {
  return (
    <View >
      <Image source={{uri: business?.images[0].url}} 
        style={{
            width:'100%',
            height:200,
            borderRadius:15,
            
        }}
      /> 
      <View>
        <Text style={{fontFamily:'appFontBold', fontSize:20,marginTop:10}}>{business?.name}</Text>
        
      <View style={styles.infoIcon}>
        <Ionicons name="location" size={24} color={Colors.PRIMARY} />
        <Text style={styles.infoText}>{business?.address}</Text>
      </View>

      <View style={styles.infoIcon}>
        <Ionicons name="globe-outline" size={24} color={Colors.PRIMARY} />
        <Text style={styles.infoText}>{business?.website}</Text>
      </View>

      <View style={styles.infoIcon}>
        <Ionicons name="call" size={24} color={Colors.PRIMARY} />
        <Text style={styles.infoText}>{business?.phone}</Text>
      </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    infoIcon:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        marginTop:5
    },
    infoText:{
       fontSize:15,
       fontFamily:'appFontSemiBold',
       color:Colors.GRAY
    }
})