// import {createSlice, PayloadAction} from @reduxjs/toolkit

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


export interface InitialStateTypes {
    isSideBarCollapse: boolean;
    isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
    isSideBarCollapse: false,
    isDarkMode: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed:(state, action: PayloadAction<boolean>)=>{
            state.isSideBarCollapse = action.payload;
        },
        setIsDarkMode:(state, action: PayloadAction<boolean>)=>{
            state.isDarkMode= action.payload;
        }
    }
});
export const {setIsSidebarCollapsed, setIsDarkMode} = globalSlice.actions;

export default globalSlice.reducer;
