import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { tokenHeader } from "@/shared/helpers/auth-header";
import { useDispatch, useSelector } from "react-redux";
import { getArticleProduit } from "@/shared/store/slices/articlesProduit";
import { AppDispatch, RootState } from "@/shared/store/store";
import { SafeAreaView } from "react-native-safe-area-context";

type ItemProps = { ID: number; description: string };

const renderItem: ListRenderItem<ItemProps> = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item?.description}</Text>
  </View>
);
const Dashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const articleProduit = useSelector(
    (store: RootState) => store.articleProduit,
  );
  const loadToken = async () => {
    const tkn = await tokenHeader();
    setToken(tkn ?? "");
  };
  useEffect(() => {
    loadToken();
  }, [token]);
  useEffect(() => {
    dispatch(getArticleProduit());
  }, [pathname, token]);
  return (
    <SafeAreaView>
      <FlatList
        data={articleProduit.data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      <Text>{articleProduit.data?.length?.toString()}</Text>
      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
        }}
      >
        <Text>login n</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Dashboard;
