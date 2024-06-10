import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Example, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import MyChat from '@/screens/Startup/MyChat';

const Stack = createStackNavigator<RootStackParamList>();


const linking = {
	prefixes: ['mychat://', 'https://mychat.com'],
	config: {
	  /* configuration for matching screens with paths */
	  screens: {
		MyChat: 'chat',
		Example: 'example',
	  },
	},
  };


function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer linking={linking} theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup} />
					<Stack.Screen name="Example" component={Example} />
					<Stack.Screen name="MyChat" component={MyChat} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
