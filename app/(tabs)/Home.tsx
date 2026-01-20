import Category from '@/components/Homescreen/Category'
import Header from '@/components/Homescreen/Header'
import Sliders from '@/components/Homescreen/Sliders'
import Colors from '@/services/Colors'
import { View, Text } from 'react-native'
 
export default function Home() {
  return (
    <View>
      <View 
        style={{
          width:'100%',
          height:200,
          backgroundColor:Colors.PRIMARY,
          position:'absolute'
        }}
      >

      </View>

      {/* Header Section */}
      <Header />

      {/* Slider Section */}
      <Sliders />

      {/* Category Section */}
      <Category />



    </View>
  )
}