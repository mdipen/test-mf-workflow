import { createStore, applyMiddleware } from 'redux';
import api from '../middlewares/api';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk, api));

export default store;
