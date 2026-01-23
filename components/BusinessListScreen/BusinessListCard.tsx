import { Image, View, Text, TouchableOpacity } from 'react-native'
import { BusinessType } from '../Homescreen/PopularBusinessList'
import Colors from '@/services/Colors'
import { useRouter } from 'expo-router'

type Props={
  business:BusinessType
}

export default function BusinessListCard({business}:Props) {
  
  const router=useRouter();
  
  return (
    <TouchableOpacity 
     onPress={() => router.push({
      pathname:'../business-detail',
      params: {
        business:JSON.stringify(business)
      }
     })}

    style={{
      padding:7,
      backgroundColor:Colors.WHITE,
      borderRadius:15,
      marginTop:10,
      marginHorizontal:20,
      display:'flex',
      flexDirection:'row',
      gap:10
    }}>
      <Image source={{uri: business?.images[0]?.url}} 
        style={{
          width:120,
          height:120,
          borderRadius:15
        }}
      />
      <View style={{
        flex:1,
        gap:5
      }}>
        <Text style={{
          fontFamily:'appFontBold',
          fontSize:18,
        }}>{business?.name}</Text>
        <Text style={{
          fontFamily:'appFontBold',
          fontSize:15,
          color:Colors.GRAY
        }}>{business?.address}</Text>
        <View style={{
          flex:1,
          flexDirection:'row',
          gap:5
        }}>
          <Image source={require('../../assets/images/star.png')} style={{
            width:20,
            height:20
          }}/>
          <Text>4.3/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}