import React, {Component} from 'react';
import { View , Text, Platform, ScrollView, Linking } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import { MapView } from 'expo';

import {connect} from 'react-redux';
import * as actions from '../actions';

class ReviewScreen extends Component{

	static navigationOptions = ({navigation}) => ({
			title: 'Review Jobs',
			headerRight: (
				<Button 
					title="Settings" 
					onPress={() => {navigation.navigate('settings')}}
					backgroundColor="rgba(0,0,0,0)"
					color = "rgba(0,122,255,1)"
				/>
				),
			tabBarIcon: ({tintColor}) => {
				return <Icon name="favorite" size={18} color={tintColor}/>
			}
		});

	renderLikedJobs() {
		return this.props.likedJobs.map(job => {
			const {
				jobtitle,jobkey,company,
				formattedRelativeTime,url,
				longitude,latitude
				} = job;
			
			const initialRegion = {
			longitude,
			latitude,
			longitudeDelta: 0.045,
			latitudeDelta: 0.02
			};
			
			return (
				<Card title={jobtitle} key={jobkey}>
					<View style={{height:200}}>
						<MapView
			              style={{ flex: 1 }}
			              cacheEnabled={Platform.OS === 'android'}
			              scrollEnabled={false}
			              initialRegion={initialRegion}
			            />
		            </View>
					<View>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{company}</Text>
							<Text style={styles.italics}>{formattedRelativeTime}</Text>
						</View>
						<Button 
							title="Apply Now!"
							backgroundColor="#03A9F4"
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			);
		});
	}

	render(){
		return(
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		);
	}
}

const styles = {
	italics:{
		fontStyle:'italic'
	},
	detailWrapper : {
		marginBottom: 10,
		marginTop:10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
}

const mapStateToProps = state =>{
	return { likedJobs : state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);