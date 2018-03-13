import React, {Component} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';

import {connect} from 'react-redux';
import * as actions from '../actions';

import {Button, Icon} from 'react-native-elements'; 

class MapScreen extends Component{

	static navigationOptions = ({navigation}) => ({
			title: 'MAP',
			tabBarIcon: ({tintColor}) => {
				return <Icon name="my-location" size={18} color={tintColor}/>
			}
		});

	state ={
		mapLoaded:false,
		buttonLoader: false,
		region: {
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09
		}
	}

	componentDidMount() {
		this.setState({mapLoaded:true});	
	}

	onRegionChangeComplete = (region) => {
		this.setState({region});
	}

	onButtonPress = () =>{
		this.setState({buttonLoader:true});
		this.props.fetchJobs(this.state.region, () =>{
			this.props.navigation.navigate('deck');
			this.setState({buttonLoader:false});
		});
	}


	render(){
		if(!this.state.mapLoaded){
			<View style={{flex:1, justifyContent:'center'}} >
				<ActivityIndicator size="large" />
			</View>
		}
		return(
			<View style={{flex:1}} >
				<MapView 
					region={this.state.region}
					style={{flex:1}}
					onRegionChangeComplete={this.onRegionChangeComplete}
				/>

				<View style={styles.buttonContainer}>
					<Button 
						large
						title={this.state.buttonLoader ? "": "Search This Area"}
						backgroundColor="#009688"
						icon={this.state.buttonLoader ? {}:{name:'search'}}
						loading={this.state.buttonLoader}
						onPress={this.onButtonPress}
						buttonStyle={{height:60}}
					/>
				</View>
			</View>
		);
	}
}


const styles = {
	buttonContainer:{
		position: 'absolute',
		bottom:20,
		left:0,
		right:0,

	}
}

export default connect(null, actions)(MapScreen);