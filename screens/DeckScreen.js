import React, {Component} from 'react';
import { View, Text,Platform } from 'react-native';
import {connect} from 'react-redux';
import {Button, Card, Icon} from 'react-native-elements'; 
import { MapView } from 'expo';

import Swipe from '../components/Swipe';

import * as actions from '../actions';

class DeckScreen extends Component{
	
	static navigationOptions = ({navigation}) => ({
			title: 'Jobs',
			tabBarIcon: ({tintColor}) => {
				return <Icon name="description" size={18} color={tintColor}/>
			}
		});

	renderCard(job){
		const initialRegion = {
			longitude: job.longitude,
			latitude: job.latitude,
			longitudeDelta: 0.045,
			latitudeDelta: 0.02
		}

		return(
			<Card title={job.title}>
				<View style={{height:350}}>
					<MapView
						scrollEnabled={false}
						style={{flex:1}}
						cacheEnabled={Platform.OS === 'android'? true : false}
						initialRegion={initialRegion}
					>	
					</MapView>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{job.company}</Text>
					<Text>{job.formattedRelativeTime}</Text>
				</View>
				<View style={{height:65}}>
					<Text>
						{job.snippet.replace(/<b>/g,'').replace(/<\/b>/g,'')}
					</Text>
				</View>
			</Card>
		);
	}

	renderNoMoreCards = () => {
		return(
			<Card title="No More Jobs">
				<Button
					title="Back To Map"
					large
					icon={{ name: 'my-location' }}
					backgroundColor="#03A9F4"
					onPress={() => this.props.navigation.navigate('map')}
				/>
			</Card>
		)
	}
	render(){
		return(
			<View style={{marginTop:30}}>
				<Swipe
					keyProp = "jobkey"
					data={this.props.jobs}
					renderCard = {this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight = {job => this.props.likeJob(job)}
				/>
			</View>
		);
	}
}

const styles = {
	detailWrapper:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom:10,
		marginTop:10
	}
}

function mapStateToProps({jobs}){
	return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);