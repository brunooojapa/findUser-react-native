// @flow
//Exemple
import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	Dimensions,
	Linking,
	Platform,
	StatusBar
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { AppHeader } from '../components/app_header';

const deviceHeight = Dimensions.get('window').height;
export default class detailsScreen extends Component {
	static navigationOptions = {
		header: null
	};

	componentWillMount() {
		const user = this.props.navigation.state;
		console.log(user.params.data);
		this.setState({ findUser: user.params.data });
	}
	navigationGPS = async () => {
		// the user's location is very compromised because the field is not always filled correctly

		if (Platform.OS === 'ios') {
			//TODO: fix in IOS
			await Linking.openURL(
				`maps://app?saddr=${this.state.fundUser.location}`
			);
		} else {
			const url = `https://www.google.com.br/maps/place/${
				this.state.findUser.location
			}`;

			return Linking.canOpenURL(url).then(supported => {
				console.log(url);
				if (!supported) {
					return Promise.reject(
						new Error('Error ao abrir o mapa', 'tente novamente.')
					);
				} else {
					return Linking.openURL(url);
				}
			});
		}
	};

	render() {
		return (
			<View style={[styles.container, { marginBottom: 50 }]}>
				<StatusBar hidden={true} barStyle="light-content" />
				<AppHeader
					onPressLeft={() => this.props.navigation.navigate('Home')}
					title={
						!this.state.findUser.name
							? this.state.findUser.login
							: this.state.findUser.name
					}
					onPressRight={this.navigationGPS}
				/>
				<ScrollView style={styles.container}>
					<View style={styles.welcomeContainer}>
						<Avatar
							rounded
							xlarge
							source={{
								uri: this.state.findUser.avatar_url,
								cache: 'force-cache'
							}}
						/>
						<Text>
							{!this.state.findUser.name
								? this.state.findUser.login
								: this.state.findUser.name}
						</Text>
					</View>

					<View style={[styles.container, { marginBottom: 50 }]}>
						<View style={styles.inputContainer}>
							<Icon
								name="user"
								type="feather"
								size={30}
								color="#000"
							/>
							<Text style={styles.inputStyle}>
								{!this.state.findUser.bio
									? ' field not populated by user'
									: this.state.findUser.bio}
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<Icon
								name="mail"
								type="feather"
								size={30}
								color="#000"
							/>
							<Text style={styles.inputStyle}>
								{!this.state.findUser.email
									? ' field not populated by user'
									: this.state.findUser.email}
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<Icon
								name="briefcase"
								type="feather"
								size={30}
								color="#000"
							/>
							<Text style={styles.inputStyle}>
								{!this.state.findUser.company
									? ' field not populated by user'
									: this.state.findUser.company}
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<Icon
								name="location"
								type="entypo"
								size={30}
								color="#000"
							/>
							<Text
								style={styles.inputStyle}
								onPress={this.navigationGPS}
							>
								{!this.state.findUser.location
									? ' field not populated by user'
									: this.state.findUser.location +
									  '    ' +
									  ' Press show map'}
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<Icon
								name="web"
								type="material-community"
								size={30}
								color="#000"
							/>
							<Text style={styles.inputStyle}>
								{this.state.findUser.html_url}
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<Icon
								name="github"
								type="feather"
								size={30}
								color="#000"
							/>
							<Text style={styles.inputStyle}>
								{this.state.findUser.html_url}
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	welcomeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: deviceHeight - 300
	},
	welcomeImage: {
		width: 190,
		marginTop: 40,
		resizeMode: 'contain'
	},
	backgroundImage: {
		flex: 1,
		width: null,
		height: null
	},
	container: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	inputStyle: {
		color: 'gray',
		fontFamily: 'Lato-Regular',
		fontSize: 17,
		overflow: 'hidden',
		paddingTop: 5,
		paddingRight: 30,
		paddingLeft: 10
	},
	inputContainer: {
		flex: 1,
		// borderBottom: 2,
		borderBottomColor: '#FFF',
		flexDirection: 'row',
		paddingLeft: 20,
		paddingBottom: 20
	}
});
