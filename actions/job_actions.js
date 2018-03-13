import axios from 'axios';
import qs from 'qs';
import reverseGecode from 'latlng-to-zip';

import {
	FETCH_JOBS,
	LIKE_JOB,
	CLEAR_LIKED_JOB
} from './types';

const ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
	publisher: '4201738803816157',
	format: 'json',
	v: '2',
	latlong:1,
	radius:10,
	q:'React.js'
}

const buildJobsUrl = (zip) =>{
	const query = qs.stringify({...JOB_QUERY_PARAMS, l:zip});
	return `${ROOT_URL}${query}`; 
}

export const fetchJobs = (region, callback) => async dispatch => {
	try{
		let zip = await reverseGecode(region);
		const url = buildJobsUrl(zip);
		let {data} = await axios.get(url);
		dispatch({type:FETCH_JOBS, payload:data});
		console.log(data);
		callback();
	}
	catch(e){
		console.log(e);
	}
}

export const likeJob = (job) => {
	return {
		type:LIKE_JOB,
		payload: job
	};
}

export const clearLikedJobs = () => {
	return {
		type:CLEAR_LIKED_JOB
	};
}