import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useLanguage} from './useLanguage';
export const useMenu=(Menu, currentLevel)=>{
    const {language} = useSelector(state=>state.apps)
    const [languages] = useLanguage(language);
    const [menu, setMenu]= useState({menus:[], keys:[]});

    useEffect(()=>{
        const fetchChildren=(childrens, keys=[])=>{
            const m=[];
            for (let iii = 0; iii < childrens.length; iii++) {
                const {key, children, level, ...rest} = childrens[iii];
                if((level & currentLevel) > 0){
                    const withChildren=!!children;
                    keys.push({key, withChildren});
                    let ch=undefined;
                    if(withChildren){
                        ch=fetchChildren(children, keys);
                    }
                    m.push({...rest, key, level, children:ch})
                }
            }
            return m;
        }
        const keys=[];
        const menus=fetchChildren(Menu(languages), keys);
        setMenu({menus, keys});
    }, [Menu, currentLevel, languages]);

    return menu;
}