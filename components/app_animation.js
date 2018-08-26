import React, { Component } from 'react';
import { Animated } from 'react-native';
const timeAnimate = 4000;

export default class FadeInView extends Component {
	state = {
		fadeAnim: new Animated.Value(0)
	};
	componentWillMount() {
		setTimeout(() => {
			this.setState({ visible: false });
		}, timeAnimate - 10);
	}

	componentDidMount() {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: timeAnimate
		}).start();
	}

	render() {
		return (
			<Animated.View
				style={{
					...this.props.style,
					opacity: this.state.fadeAnim.interpolate({
						inputRange: [0, 0.9, 1],
						outputRange: [0, 1, 0]
					}),
					transform: [
						{
							scale: this.state.fadeAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 1]
							})
						}
					]
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
