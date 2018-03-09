import React, {Component} from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component{
	static navigationOptions = ({navigation}) => ({
			title: 'Settings',
			headerStyle: {
				marginTop: -24
			}
		});
	render(){
		return(
			<View>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
			</View>
		);
	}
}

export default SettingsScreen;