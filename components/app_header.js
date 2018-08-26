import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
const deviceWidth = Dimensions.get('window').width;
const AppHeader = ({ title, onPressLeft, onPressRight }) => {
	return (
		<View style={styles.container}>
			<Icon
				name="chevron-left"
				type="feather"
				size={30}
				color="#000"
				iconStyle={styles.iconStyle}
				underlayColor="transparent"
				onPress={onPressLeft}
			/>
			<Text
				numberOfLines={1}
				ellipsizeMode={'tail'}
				style={styles.textStyle}
			>
				{title}
			</Text>
			<Icon
				name="navigation"
				type="feather"
				size={30}
				color="#000"
				iconStyle={styles.iconStyle}
				underlayColor="transparent"
				onPress={onPressRight}
			/>
		</View>
	);
};

const styles = {
	container: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		height: 65,
		paddingTop: 30,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2
	},
	textStyle: {
		width: deviceWidth - 70,
		color: '#000',
		fontSize: 17,
		fontWeight: '600',
		textAlign: 'center',
		marginLeft: -15
	},
	iconStyle: {
		paddingHorizontal: 5
	}
};

export { AppHeader };
