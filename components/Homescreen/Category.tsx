import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobalApi'
import { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native'

export type categoryType = {
    name:string
    premium:boolean
    icon:{url:string}
}

export default function Category() {

  const [categoryList, setCategoryList] = useState<categoryType[]>([])

  useEffect(() => {
    GetCategories();
  }, []);
  
  const GetCategories = async () =>{
    const response = await axiosClient.get('/categories?.filters[premium][$eq]=true&populate=*');
    console.log(response?.data.data)
    setCategoryList(response?.data?.data)
  }

  return (
    <View style= {{
        marginTop:15
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10
      }}>
        <Text style={{
            fontFamily:'appFontSemiBold',
            fontSize:20
        }}>Category</Text>
        <Text style={{
            fontFamily:'appFontSemiBold',
            color:Colors.PRIMARY
        }}>View All</Text>
      </View>

      <FlatList 
        data={categoryList}
        numColumns={4}
        renderItem={({item, index}) => (
            <TouchableOpacity style={{
                flex:1,
                alignItems:'center',
                padding:15,
                backgroundColor:Colors.WHITE,
                margin:3,
                height:95,
                borderRadius:10,
                justifyContent:'center'
            }}> 
                <Image 
                    source={{uri: item?.icon?.url}}
                    style={{
                        width:40,
                        height:40
                    }}
                />
                <Text style={{
                    textAlign:'center',
                    marginTop:3
                }}>{item.name}</Text>
            </TouchableOpacity>
       )}
      />
    </View>
  )
}