import { useEffect } from "react";
import { useDispatch } from "react-redux"
import {setSelectedMenu, setOpenKeys} from '../redux'

export const useNavs=(keys, activeMenu)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const selMenu=[];
        const openKeys=[];
        for (let iii = 0; iii < keys.length; iii++) {
            const {key, withChildren} = keys[iii];
            if(`${activeMenu}`.toLowerCase().indexOf(`${key}`.toLowerCase())>=0){
                selMenu.push(key);
                if(withChildren){
                    openKeys.push(key);
                }
            }
        }
        console.log(selMenu, openKeys);
        dispatch(setSelectedMenu(selMenu.pop()));
        dispatch(setOpenKeys(openKeys));
    }, [keys, activeMenu]);
}