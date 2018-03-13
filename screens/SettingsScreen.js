import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component{
	static navigationOptions = ({navigation}) => ({
			title: 'Settings'0
		});
	
	render(){
		return(
			<View>
				<View style={{marginTop:10}}/>
				<Button
					title="Reset Liked Jobs"
					large
					icon={{ name: 'delete-forever' }}
					backgroundColor="#F44336"
					onPress={this.props.clearLikedJobs}
				/>
			</View>
		);
	}
}

export default connect(null, { clearLikedJobs })(SettingsScreen);