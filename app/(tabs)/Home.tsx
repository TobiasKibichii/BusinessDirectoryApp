import Category from '@/components/Homescreen/Category'
import Header from '@/components/Homescreen/Header'
import PopularBusinessList from '@/components/Homescreen/PopularBusinessList'
import PopularBusinessListt from '@/components/Homescreen/PopularBusinessList'
import Sliders from '@/components/Homescreen/Sliders'
import Colors from '@/services/Colors'
import { View, Text, ScrollView, FlatList } from 'react-native'
 
export default function Home() {
  return (
    <FlatList 
      data={[]}
      renderItem={null}    
      ListHeaderComponent ={
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

      <PopularBusinessList />

      <View style={{height:460}}></View>

    </View>
      }/>
  )
}