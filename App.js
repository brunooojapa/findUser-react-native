import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation/RootNavigator';
import { AppLoading, Asset, Font } from 'expo';

export default class App extends React.Component {
	state = {
		fontLoaded: false
	};
	async componentDidMount() {
		await Font.loadAsync({
			'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf')
		});
		// await Asset.loadAsync([
		// 	require('./assets/images/background_login.png'),
		// 	require('./assets/images/logo_drawer.png')
		// ]);
	}
	render() {
		if (!this.state.assestsLoad) {
			return (
				<AppLoading
					startAsync={this.componentDidMount}
					onFinish={() => this.setState({ assestsLoad: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<View style={styles.container}>
				{this.state.assestsLoad ? (
					<RootNavigation style={{ fontFamily: 'Lato-Regular' }} />
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	statusBarUnderlay: {
		height: 24,
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	btn: {
		backgroundColor: '#fff'
	}
});
