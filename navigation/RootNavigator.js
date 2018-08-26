// @flow

import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import DetailsScreen from '../screens/detailsScreen';

const RootNavigator = StackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Detail: {
			screen: DetailsScreen
		}
	},
	{
		headerMode: 'none',
		title: 'Main',
		initialRouteName: 'Home'
	}
);

export default RootNavigator;
