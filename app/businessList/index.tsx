import Colors from '@/services/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { axiosClient } from '@/services/GlobalApi';
import { useEffect, useState } from 'react';
import { BusinessType } from '@/components/Homescreen/PopularBusinessList';
import BusinessListCard from '@/components/BusinessListScreen/BusinessListCard';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BusinessList() {

  const {categoryName} =useLocalSearchParams();
  console.log(categoryName)

  const[businessList, setBusinessList] = useState<BusinessType[]>([]);
  const[originalBusinessList, setOriginalBusinessList] =useState<BusinessType[]>([]);

  const [loading, setLoading] =useState(false);
  const router =useRouter();

  useEffect(() =>{
    GetBusinessListByCategory();
  },[])

  const GetBusinessListByCategory = async () =>{
    setLoading(true);
    const response= await axiosClient.get('/list-businesses?filters[category][name][$eq]='+ categoryName +'&populate=*');
    console.log(response?.data.data);
    setBusinessList(response?.data.data);
    setOriginalBusinessList(response?.data.data);
    setLoading(false);
  }

  const onSearchFilter =(searchInput: string) =>{
    if(!searchInput){
      setBusinessList(originalBusinessList);
    }

    const filterList = originalBusinessList.filter((item) => item.name.toLowerCase().includes(searchInput?.toLowerCase()));
    
    setBusinessList(filterList)
  }

  return (
    <View>
      <View style={{
        width:'200%',
        height:150,
        backgroundColor:Colors.PRIMARY,
        position:'absolute',
        
      }}>

      </View>

      <View style={{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
        
      }}>
        <TouchableOpacity onPress={() => router.back()}
           style={{position:'absolute', left:0}}
          >
          <AntDesign name="rollback" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily:'appFontBold',
            fontSize:25,
            textAlign:'center',
            padding:20,
            color:'yellow',
          
          }}
        >{categoryName} Business List</Text>
      </View>

      <View style={{
            backgroundColor:Colors.WHITE,
            padding:15,
            borderRadius:99,
            paddingHorizontal:10,
            flex:1,
            flexDirection:'row',
            gap:4,
            marginHorizontal:50,
            alignItems:'center'
          }}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput 
          placeholder='Search Businesses'
          style={{
            width:'100%',
            outlineColor:'rgba(0,0,0,0)'
          }}

          onChangeText={(value) => onSearchFilter(value)}
        />
      </View>

      <FlatList 
        data={businessList}
        onRefresh={()=> GetBusinessListByCategory()}
        refreshing={loading}
        renderItem={({item, index}) => (
          <BusinessListCard business={item} key={index}/>
        )}
      />
    </View>
  )
}