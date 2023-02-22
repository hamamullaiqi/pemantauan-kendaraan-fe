import {createSlice} from '@reduxjs/toolkit'
const Navigations = createSlice({
    name:'nav',
    initialState:{selectedMenu:'', selectedMenuKeys:'', openKeys:['']},
    reducers:{
        setSelectedMenu(state, action){
            state.selectedMenu=action.payload;
        },
        setSelectedMenuKeys(state, action){
            state.selectedMenuKeys=action.payload;
        },
        setOpenKeys(state, action){
            state.openKeys=action.payload;
        }
    }
})

export const {setSelectedMenu, setSelectedMenuKeys, setOpenKeys} = Navigations.actions

export default Navigations.reducer