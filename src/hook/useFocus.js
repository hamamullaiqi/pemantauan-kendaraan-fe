import { useEffect } from "react";
import { useState } from "react"

export const useFocus=()=>{
    const [focus, setFocus]=useState(true);
    
    const onFocus=()=>{
        console.log("Focus");
        setFocus(true);
    }
    
    const onBlur=()=>{
        console.log("Blur");
        setFocus(false);
    }

    useEffect(()=>{
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        }
    }, []);

    return focus;
}