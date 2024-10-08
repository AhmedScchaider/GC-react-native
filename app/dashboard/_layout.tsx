import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Redirect, usePathname } from "expo-router";
import { tokenHeader } from "@/shared/helpers/auth-header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const pathname = usePathname();

  if (pathname && !tokenHeader()) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Dashboard",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="invoiceTabs"
        options={{
          drawerLabel: "Invoices",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="quotationTabs"
        options={{
          drawerLabel: "Quotations",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="IncomingClients"
        options={{
          drawerLabel: "Incoming Clients",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="ReservationChamber"
        options={{
          drawerLabel: "Room Reservations",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/client"
        options={{
          drawerLabel: "Clients",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/clientVerriere"
        options={{
          drawerLabel: "Client verriere",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/company"
        options={{
          drawerLabel: "Companies",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/doneReservations"
        options={{
          drawerLabel: "Done reservations",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/sellers"
        options={{
          drawerLabel: "Sellers",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="traider/sellersState"
        options={{
          drawerLabel: "Sellers state",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="restaurant/daylyCloseTickets"
        options={{
          drawerLabel: "Daily close tickets",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="restaurant/closedTickets"
        options={{
          drawerLabel: "Closed tickets",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="restaurant/settings/plateOptions"
        options={{
          drawerLabel: "Plate options",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="restaurant/settings/platesFormulas"
        options={{
          drawerLabel: "Plates Formulas",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="restaurant/settings/tables"
        options={{
          drawerLabel: "Tables",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/articles"
        options={{
          drawerLabel: "Articles",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/incomingGoods"
        options={{
          drawerLabel: "Incoming goods",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/inventaire"
        options={{
          drawerLabel: "Inventaires",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/statistics"
        options={{
          drawerLabel: "Statistics",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/transferGoods"
        options={{
          drawerLabel: "Transfer Goods",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/settings/articleCategories"
        options={{
          drawerLabel: "Article categories",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/settings/articleSubCategories"
        options={{
          drawerLabel: "Article types",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="economa/settings/lot"
        options={{
          drawerLabel: "Lots",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/bank"
        options={{
          drawerLabel: "Banks",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/identity"
        options={{
          drawerLabel: "Identity",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/identityTypes"
        options={{
          drawerLabel: "Identity Types",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/nationality"
        options={{
          drawerLabel: "Nationality Types",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/paiementTypes"
        options={{
          drawerLabel: "Paiement types",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/reservationServices"
        options={{
          drawerLabel: "Reservation services",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/rooms"
        options={{
          drawerLabel: "Rooms",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/tax"
        options={{
          drawerLabel: "Tax",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/units"
        options={{
          drawerLabel: "Units",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/unitTypes"
        options={{
          drawerLabel: "Unit types",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/userManagement"
        options={{
          drawerLabel: "User Management",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings/userRole"
        options={{
          drawerLabel: "User roles",
          title: "overview",
        }}
      />
    </Drawer>
  );
}
