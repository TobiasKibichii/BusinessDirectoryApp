import Colors from '@/services/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, ToastAndroid, Platform, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import BusinessInfo from '@/components/BusinessDetailScreen/BusinessInfo';
import ActionButtonSection from '@/components/BusinessDetailScreen/ActionButtonSection';
import BusinessDescription from '@/components/BusinessDetailScreen/BusinessDescription';
import { axiosClient } from '@/services/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

export default function index() {

  const router=useRouter();
  const {business} =useLocalSearchParams();
  const businessDetail=JSON.parse(business.toString());
  const {user} = useUser();
  const [isFav, setIsFav] =useState(false)
  const [useBusinessId, setUseBusinessId] =useState<{documentId:string}>()

  useEffect(() => {
    user && CheckFavoriteMarked();
  },[user])


 const MarkAsFavorite = async () => {
  try {
    if (isFav) {
      await axiosClient.delete(
        '/user-favorites/' + useBusinessId?.documentId
      );

      Toast.show({
        type: 'success',
        text1: 'Removed',
        text2: 'Business removed from favorites',
      });

      CheckFavoriteMarked();
    } else {
      await axiosClient.post('/user-favorites', {
        data: {
          businessId: businessDetail?.id,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Saved',
        text2: 'Business saved as favorite',
      });

      CheckFavoriteMarked();
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong',
    });
  }
};



  const CheckFavoriteMarked = async () =>{
    const response = await axiosClient.get('/user-favorites?filters[userEmail][$eq]='+user?.primaryEmailAddress?.emailAddress+'&filters[businessId][$eq]='+businessDetail?.id);

    console.log('Marked:', JSON.stringify(response?.data.data))
    const data=response?.data.data
    setUseBusinessId(data[0]);
    
      if(data.length > 0){
        setIsFav(true)
      } else {
        setIsFav(false)
      }

      
}

  return (
    <View style={{}}>
          <View style={{
            width:'200%',
            height:150,
            backgroundColor:Colors.PRIMARY,
            position:'absolute',
            
          }}>
    
          </View>
    
    <View style={{marginHorizontal:30}}>
          <View style={{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            
          }}>
          
          
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="rollback" size={24} color={Colors.YELLOW} />
            </TouchableOpacity> 

            {isFav? 
            <TouchableOpacity onPress={MarkAsFavorite}>
              <Fontisto name="favorite" size={24} color={Colors.YELLOW} />
            </TouchableOpacity> :
            <TouchableOpacity onPress={MarkAsFavorite}>
              <Fontisto name="bookmark" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          }
          
        </View>
        
        <BusinessInfo business={businessDetail}/>

        {/* Action Screen */}
        <ActionButtonSection business={businessDetail}/>

        {/* Business Description */}
        <BusinessDescription business={businessDetail} />
        </View>
    </View>
  )
}