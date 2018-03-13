import { createStore, compose, applyMiddleware } from 'redux';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducers from '../reducers';

const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(thunk),
		autoRehydrate()
	)
);

persistStore(store, {storage: AsyncStorage, whitelist:['likedJobs']});

export default store;