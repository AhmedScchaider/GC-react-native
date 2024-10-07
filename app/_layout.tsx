import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "./(auth)/login";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/IncomingClients" />
        <Stack.Screen name="(dashboard)/ReservationChamber" />
        <Stack.Screen name="(dashboard)/traider/client" />
        <Stack.Screen name="(dashboard)/traider/clientVerriere" />
        <Stack.Screen name="(dashboard)/traider/company" />
        <Stack.Screen name="(dashboard)/traider/doneReservations" />
        <Stack.Screen name="(dashboard)/traider/sellers" />
        <Stack.Screen name="(dashboard)/traider/sellersState" />
        <Stack.Screen name="(dashboard)/restaurant/daylyCloseTickets" />
        <Stack.Screen name="(dashboard)/restaurant/closedTickets" />
        <Stack.Screen name="(dashboard)/restaurant/settings/plateOptions" />
        <Stack.Screen name="(dashboard)/restaurant/settings/platesFormulas" />
        <Stack.Screen name="(dashboard)/restaurant/settings/tables" />
        <Stack.Screen name="(dashboard)/economa/articles" />
        <Stack.Screen name="(dashboard)/economa/incomingGoods" />
        <Stack.Screen name="(dashboard)/economa/inventaire" />
        <Stack.Screen name="(dashboard)/economa/statistics" />
        <Stack.Screen name="(dashboard)/economa/transferGoods" />
        <Stack.Screen name="(dashboard)/economa/settings/articleCategories" />
        <Stack.Screen name="(dashboard)/economa/settings/articleSubCategories" />
        <Stack.Screen name="(dashboard)/economa/settings/articleType" />
        <Stack.Screen name="(dashboard)/economa/settings/lot" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="(dashboard)/index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
