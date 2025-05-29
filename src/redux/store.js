import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice';
import { baseApi } from "./api/baseApi";

const store = configureStore({
    reducer :{
        modal : modalReducer,
        [baseApi.reducerPath] : baseApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;