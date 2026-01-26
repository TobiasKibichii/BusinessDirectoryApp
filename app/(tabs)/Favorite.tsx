import BusinessListCard from "@/components/BusinessListScreen/BusinessListCard";
import { BusinessType } from "@/components/Homescreen/PopularBusinessList";
import Colors from "@/services/Colors";
import { axiosClient } from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

type business = {
  business: BusinessType;
};

export default function Favorite() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState<BusinessType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserFavBusinessList();
  }, []);

  const GetUserFavBusinessList = async () => {
    setLoading(false);
    const response = await axiosClient.get(
      "/user-favorites?filtrs[email][$eq]=" +
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
      <Text
        style={{
          fontFamily: "appFontBold",
          fontSize: 25,
          color: Colors.YELLOW,
        }}
      >
        User Favorites
      </Text>
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
