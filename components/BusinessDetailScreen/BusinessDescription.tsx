import { View, Text } from 'react-native'
import { BusinessType } from '../Homescreen/PopularBusinessList'
import Colors from '@/services/Colors'

type Props ={
    business:BusinessType
}

export default function BusinessDescription({business}: Props) {
  return (
    <View style={{marginTop:15}}>
      <Text style={{fontFamily:'appFontBold', fontSize:20}}>Description</Text>
      <Text style={{
        fontSize:16,
        fontFamily:'appFontSemiBold',
        color:Colors.GRAY
      }}>{business?.description}</Text>
    </View>
  )
}