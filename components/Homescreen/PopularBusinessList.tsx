import Colors from '@/services/Colors'
import { axiosClient } from '@/services/GlobalApi'
import { useEffect, useState } from 'react';
import { Image, View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { categoryType } from './Category';


export type BusinessType ={
  name:string,
  address:string,
  email:string,
  premium:boolean,
  category:categoryType,
  images:ImageType[],
  id:number
}

type ImageType = {
  url:string
}

export default function PopularBusinessList() {

  const [businessList, setBusinessList] =useState<BusinessType[]>([])

  const[loading, setLoading] = useState(false);

  useEffect(() => {
    GetPopularBusinessList();
  },[])

  const GetPopularBusinessList = async () => {
    setLoading(true);

    const response = await axiosClient.get('/list-businesses?.filters[premium][$eq]=true&populate=*');
    console.log(JSON.stringify(response?.data.data))
    setBusinessList(response?.data.data)

    setLoading(false);
  }

  return (
    <View>
      <View style ={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:10
      }}>
        <Text style={{
          fontFamily:'appFontSemiBold',
          fontSize:20
        }}>Popular Businesses</Text>
        <Text style={{
          color:Colors.PRIMARY,
          fontSize:15
        }}>View All</Text>
      
      </View>

        {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY}/>}

        <FlatList 
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) =>(

            <View key={index} style={{
              width:230,
              marginHorizontal:10,
              borderColor:Colors.WHITE,
              borderRadius:15
            }}>
              <Image source ={{ uri: item.images[0].url}} 
                style={{
                  width:'100%',
                  height:120,
                  borderTopRightRadius:15,
                  borderTopLeftRadius:15,
                }}
              />
              <View style={{
                padding:7
              }}> 
                <Text
                  style={{
                    fontFamily:'appFontSemiBold',
                    fontSize:17
                  }}
                >{item.name}</Text>
                <Text style={{
                  marginTop:5,
                  color:Colors.GRAY,
                  fontFamily:'appFontSemiBold'
                }}>{item.address}</Text>

                <View style={{flex:1,
                  flexDirection:'row',
                  alignItems:'center',
                  gap:5,
                  marginTop:5
                }}><Image source={require('../../assets/images/star.png')}  style={{
                  width:20,
                  height:20
                }}/>
                <Text>4.3/5</Text>
                </View>
              </View>
            </View>
        )}
        />
      
  </View>
  )
}