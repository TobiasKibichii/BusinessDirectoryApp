import BusinessListCard from "@/components/BusinessListScreen/BusinessListCard";
import { BusinessType } from "@/components/Homescreen/PopularBusinessList";
import Colors from "@/services/Colors";
import { axiosClient } from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type business = {
  business: BusinessType;
};

export default function Favorite() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState<BusinessType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetUserFavBusinessList();
  }, []);

  const GetUserFavBusinessList = async () => {
    setLoading(false);
    const response = await axiosClient.get(
      "/user-favorites?filters[userEmail][$eq]=" +
        user?.primaryEmailAddress?.emailAddress,
    );
    console.log(response?.data.data);
    let businessIds: any = [];
    const favList = response?.data.data;
    favList.forEach((item: any) => {
      businessIds.push(item?.businessId);
    });
    console.log(businessIds);
    await GetBusinessList(businessIds);
    setLoading(true);
  };

  const GetBusinessList = async (businessIds: []) => {
    const response = await axiosClient.get("/list-businesses", {
      params: {
        "filters[id][$in]": businessIds,
        populate: "*",
      },
    });
    console.log(response?.data.data);
    setBusinessList(response?.data.data);
  };

  return (
    <View>
      <View
        style={{
          width: "200%",
          height: 150,
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
        }}
      ></View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          marginBottom: 50,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", left: 0 }}
        >
          <AntDesign name="rollback" size={24} color={Colors.YELLOW} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "appFontBold",
            fontSize: 25,
            color: Colors.YELLOW,
            textAlign: "center",
          }}
        >
          User Favorites
        </Text>
      </View>

      <FlatList
        data={businessList}
        showsVerticalScrollIndicator={false}
        onRefresh={() => GetUserFavBusinessList()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
