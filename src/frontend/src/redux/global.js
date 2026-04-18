import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    model:0,
}
const global = createSlice({
    name:'global',
    initialState:initialState,
    reducers:{
        setModel(state,action){
            state.model = action.payload;
        }
    }
})

export default global.reducer;
export const {setModel} = global.actions;