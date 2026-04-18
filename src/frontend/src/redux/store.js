import {} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import global from './global';
const store = configureStore({
    reducer:{
        'global':global
    }
})

export default store;