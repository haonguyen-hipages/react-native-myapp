import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from "react-native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
// eslint-disable-next-line import/no-extraneous-dependencies
import Courier from "@trycourier/courier-react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

function Example() {
  const { t } = useTranslation(["example", "welcome"]);
  const navigation = useNavigation();
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(t("example:welcome", data.name));
    }
  }, [isSuccess, data]);

//   useEffect(() => {
//     const requestUserPermission = async () => {
//       const res = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//       );
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//       if (enabled) {
//         console.log("Authorization status:", authStatus);
//         try {
// 			const token = await messaging().getToken();
// 			console.log("Token:", token);
// 		} catch (error) {
// 			console.log("Error:", error);
// 		}
		
//       }
//     };
// 	requestUserPermission();

// 	const listenToForegroundNotifications = async () => {
// 		const unsubscribe = messaging().onMessage(async remoteMessage => {
// 		  console.log(
// 			'A new message arrived! (FOREGROUND)',
// 			JSON.stringify(remoteMessage),
// 		  );
// 		});
// 		return unsubscribe;
// 	  }
	
// 	  const listenToBackgroundNotifications = async () => {
// 		const unsubscribe = messaging().setBackgroundMessageHandler(
// 		  async remoteMessage => {
// 			console.log(
// 			  'A new message arrived! (BACKGROUND)',
// 			  JSON.stringify(remoteMessage),
// 			);
// 		  },
// 		);
// 		return unsubscribe;
// 	  }
	
// 	  const onNotificationOpenedAppFromBackground = async () => {
// 		const unsubscribe = messaging().onNotificationOpenedApp(
// 		  async remoteMessage => {
// 			console.log(
// 			  'App opened from BACKGROUND by tapping notification:',
// 			  JSON.stringify(remoteMessage),
// 			);
// 		  },
// 		);
// 		return unsubscribe;
// 	  };
	
// 	  const onNotificationOpenedAppFromQuit = async () => {
// 		const message = await messaging().getInitialNotification();
	
// 		if(message) {
// 		  console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
// 		}
// 	  };

// 	  listenToForegroundNotifications()
// 	  listenToBackgroundNotifications();
// 	  onNotificationOpenedAppFromBackground();
// 	  onNotificationOpenedAppFromQuit();
//   }, []);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    navigation.navigate("MyChat");
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <Brand height={300} width={300} />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t("welcome:title")}
            </Text>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_32,
              ]}
            >
              {t("welcome:subtitle")}
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              {t("welcome:description")}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              testID="fetch-user-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
            >
              {isFetching ? (
                <ActivityIndicator />
              ) : (
                <ImageVariant
                  source={SendImage}
                  style={{ tintColor: colors.purple500 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              testID="change-theme-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => onChangeTheme()}
            >
              <ImageVariant
                source={ColorsWatchImage}
                style={{ tintColor: colors.purple500 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              testID="change-language-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() =>
                onChangeLanguage(i18next.language === "fr" ? "en" : "fr")
              }
            >
              <ImageVariant
                source={TranslateImage}
                style={{ tintColor: colors.purple500 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
