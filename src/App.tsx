import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";
import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { useEffect } from "react";
import Courier, { CourierPushProvider } from "@trycourier/courier-react-native";
import messaging from "@react-native-firebase/messaging";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log("Authorization status:", authStatus);
        try {
          const token = await messaging().getToken();
          console.log("Token:", token);
		  const status = await Courier.shared.requestNotificationPermission();
      	  console.log(status);
		  await Courier.shared.setToken({
			key: 'fcm',
			token,
		  });
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };
    requestUserPermission();

    // Handle pushes
    const pushListener = Courier.shared.addPushNotificationListener({
      onPushNotificationDelivered: (push) => {
        console.log(push);
      },
      onPushNotificationClicked: (push) => {
        console.log(push);
        setTimeout(() => {
          Linking.openURL(push.clickAction);
        }, 1000);
      },
    });

    return () => {
      pushListener.remove();
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storage={storage}>
        <ApplicationNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
