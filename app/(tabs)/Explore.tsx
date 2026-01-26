import Colors from '@/services/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { axiosClient } from '@/services/GlobalApi';
import { useEffect, useState } from 'react';
import { BusinessType } from '@/components/Homescreen/PopularBusinessList';
import BusinessListCard from '@/components/BusinessListScreen/BusinessListCard';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Explore() {
  const router =useRouter();

  const {categoryName} =useLocalSearchParams();
  console.log(categoryName)

  const[businessList, setBusinessList] = useState<BusinessType[]>([]);
  const[originalBusinessList, setOriginalBusinessList] =useState<BusinessType[]>([]);

  const [loading, setLoading] =useState(false);


  useEffect(() =>{
    GetBusinessList();
  },[])

  const GetBusinessList = async () =>{
    setLoading(true);
    const response= await axiosClient.get('/list-businesses?populate=*');
    console.log(response?.data.data);
    setBusinessList(response?.data.data);
    setOriginalBusinessList(response?.data.data);
    setLoading(false);
  }

  const onSearchFilter =(searchInput: string) =>{
    if(!searchInput){
      setBusinessList(originalBusinessList);
    }

    const filterList = originalBusinessList.filter((item) => item.name.toLowerCase().includes(searchInput?.toLowerCase())) && originalBusinessList.filter((item) => item.category.name.toLowerCase().includes(searchInput?.toLowerCase()))
    
    setBusinessList(filterList)
  }

  return (
    <View style={{flex:1,marginBottom:30}}>
      <View 
        style={{
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
        justifyContent:'center',
        marginVertical:30
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
        >Explore Business List</Text>
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
        onRefresh={()=> GetBusinessList()}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        renderItem={({item, index}) => (
          <TouchableOpacity 
              onPress={() => router.push({
               pathname:'../business-detail',
               params: {
                 business:JSON.stringify(item)
               }
              })}
         
             style={{
              
               backgroundColor:Colors.WHITE,
               borderTopLeftRadius:15,
               borderTopRightRadius:15,
               borderWidth:1,
               borderColor:Colors.PRIMARY,
               marginTop:20,
               marginHorizontal:20,
               display:'flex',
               flexDirection:'column',
               gap:10
             }}>
               <Image source={{uri: item?.images[0]?.url}} 
                 style={{
                   width:'100%',
                   height:200,
                   borderTopLeftRadius:15,
                   borderTopRightRadius:15
                 }}
               />
               <View style={{
                 flex:1,
                 gap:5,
                 padding:4
               }}>
                 <Text style={{
                   fontFamily:'appFontBold',
                   fontSize:18,
                 }}>{item?.name}</Text>
                 <Text style={{
                   fontFamily:'appFontBold',
                   fontSize:15,
                   color:Colors.GRAY
                 }}>{item?.address}</Text>
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

             
        )}
      />

    </View>
  )
}