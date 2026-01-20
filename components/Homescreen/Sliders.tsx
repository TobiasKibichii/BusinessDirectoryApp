import { axiosClient } from '@/services/GlobalApi';
import { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, Dimensions, StyleSheet } from 'react-native'

type SliderType = {
    name:string,
    image:{url:string}
}

export default function Sliders() {

  const [sliders, setSliders] = useState<SliderType[]>([]);

  useEffect(() => {
    GetSliders();
  }, [])
  
  // Fetch Slider from Admin Panel
  const GetSliders = async() => {
    const response = await axiosClient.get('/sliders?populate=*');
    console.log(JSON.stringify(response.data));
    setSliders(response?.data?.data)
  }

  return (
    <View style={{
        marginTop:20
    }}>
      <FlatList 
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem ={({item, index}) =>(
            <View key={index}> 
                <Image 
                    source ={{uri:item?.image?.url}}
                    style={{
                        width:Dimensions.get('screen').width*0.22,
                        height:200,
                        borderRadius:10,
                        marginHorizontal:15,
                    }}
                />
            </View>
        )}
      />
    </View>
  )
}

