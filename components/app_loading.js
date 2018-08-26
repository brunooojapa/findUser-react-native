import React from 'react';
import { View, ActivityIndicator, Dimensions, Text } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const Spinner = ({ size, style }) => {
	return (
		<View style={[styles.spinnerStyle, style]}>
			<ActivityIndicator color={'#000'} size={'large'} />
			<Text style={styles.textWait}>Please Wait ...</Text>
		</View>
	);
};

const styles = {
	textWait: { padding: 10 },
	spinnerStyle: {
		height: deviceHeight,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export { Spinner };
