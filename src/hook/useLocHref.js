import {useEffect, useState} from 'react';

export const useLocHref = (basename)=>{
    const [key, setKey]=useState('');
    useEffect(()=>{
        const uri=window.location.href;
        const docs=uri.split('/');
        const pregs=[];
        let baseFound=false;
        for (let iii = 0; iii < docs.length; iii++) {
            const doc = docs[iii];
            if(doc===basename){
                baseFound=true;
                continue;
            }
            if(baseFound){
                pregs.push(doc);
            }
        }
        const key='/'+pregs.join('/');
        setKey(key);
    }, []);

    return key;
}