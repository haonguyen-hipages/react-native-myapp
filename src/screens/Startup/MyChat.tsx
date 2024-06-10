import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function MyChat({ navigation }: RootScreenProps<'MyChat'>) {
	const { layout, gutters, fonts } = useTheme();
	const { t } = useTranslation(['startup']);

	const { isSuccess, isFetching, isError } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return Promise.resolve(true);
		},
	});

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Text style={[fonts.size_16]}>Tét</Text>
			</View>
		</SafeScreen>
	);
}

export default MyChat;
