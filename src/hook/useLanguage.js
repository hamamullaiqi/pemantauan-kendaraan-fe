import {useEffect, useMemo, useState} from 'react';
import Bahasa from '../languages/id';
import English from '../languages/gb';
import {getLanguage} from '../languages/utils';
import { useSelector } from 'react-redux';

export const useLanguage = (lan) => {
    const [menu, setMenu]=useState(Bahasa);
    const {language} = useSelector(state=>state.apps);
    const l=useMemo(()=>{
        return lan || language;
    }, [lan, language]);
    useEffect(()=>{
        switch (l.toLowerCase()) {
            case 'id':
                setMenu(Bahasa);
                break;
            
            default:
                setMenu(English);
                break;
        }
    }, [l]);

    const getLang=(name)=>getLanguage(`${name}`.toLowerCase(), menu);
    
    return [menu, getLang];
}