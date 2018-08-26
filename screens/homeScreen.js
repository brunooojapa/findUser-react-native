// @flow
//Exemple
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	Dimensions,
	Image,
	StatusBar,
	Animated
} from 'react-native';
import { Icon, FormLabel, FormInput } from 'react-native-elements';
import Axios from 'react-native-axios';
import { LinearGradient } from 'expo';
import { Spinner } from '../components/app_loading';
import FadeInView from '../components/app_animation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const timeAnimate = 4000;

export default class homeScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {};
	componentWillMount() {
		this.setState({ loading: false });
		setTimeout(() => {
			this.setState({ visible: false });
		}, timeAnimate - 10);
	}
	search = () => {
		this.setState({
			loading: true
		});
		if (!this.state.message) {
			console.log('no words');
			this.setState({
				loading: false
			});
			Alert.alert(
				'Algo está errado',
				'Preencha os capos para efetuar uma busca.'
			);
		} else {
			Axios({
				cache: 'no-cache',
				method: 'get',
				url: 'https://api.github.com/users/' + this.state.message,
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					if (response.status == 200) {
						console.log('========== response 200 =============');
						// console.log(response);
						this.setState({
							loading: false
						});
						this.props.navigation.navigate('Detail', response);
					} else {
						console.log('========== response erro =============');
						Alert.alert(
							'Algo está errado',
							'Verificar sua conecxão'
						);
						this.setState({ loading: false });
						console.log(response.data);
					}
				})
				.catch(error => {
					this.setState({ loading: false });
					console.log('Ops');
					Alert.alert('Algo está errado', 'Nome do Usuario invalido');
				});
		}
	};
	render() {
		return (
			<View>
				<StatusBar hidden={true} barStyle="light-content" />
				<FadeInView
					style={{
						width: deviceWidth,
						height: deviceHeight,
						display: this.state.visible == false ? 'none' : 'flex'
					}}
				>
					<Image
						source={require('../assets/images/GitHub_Logo.png')}
						style={styles.backgroundImageAnimate}
					/>
				</FadeInView>

				<View>
					{this.state.loading ? (
						<View>
							<Spinner />
						</View>
					) : (
						<View style={styles.container}>
							<LinearGradient
								colors={['transparent', 'rgba(0,0,0,0.3)']}
								start={[0, 0]}
								end={[1, 1]}
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: 0,
									height: deviceHeight
								}}
							/>
							<View style={styles.labelContainer}>
								<FormLabel labelStyle={styles.labelStyle}>
									{'Find users on GitHub'}
								</FormLabel>
								<FormInput
									keyboardAppearance="dark"
									autoCapitalize="none"
									autoCorrect={false}
									returnKeyType="done"
									placeholder="Find User"
									keyboardType="email-address"
									onChangeText={text =>
										this.setState({ message: text })
									}
									inputStyle={styles.inputStyle}
								/>
							</View>
							<Icon
								name="search"
								color="#000"
								raised={true}
								onPress={this.search}
								size={150}
							/>
						</View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	labelContainer: {
		width: deviceWidth,
		paddingTop: 30,
		marginBottom: 30
	},
	inputStyle: {
		color: '#000',
		fontSize: 70,
		fontFamily: 'Lato-Regular',
		overflow: 'hidden',
		borderBottomColor: '#0382c8'
	},
	backgroundImageAnimate: {
		marginTop: 150,
		flex: 0.7,
		width: null,
		height: null,
		resizeMode: 'contain'
	}
});
