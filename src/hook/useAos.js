import { useMemo } from "react";

const effects=['flip-left', 'flip-right', 'flip-up', 'fade-up', 'fade-down', 'fade-right', 'fade-left',
    'zoom-in-up', 'zoom-in-down', 'zoom-out-up', 'zoom-out-down', 'fade-out-up', 'fade-out-down' ];

export const useAos=()=>{
    const aos=useMemo(()=>{
        return effects[Math.floor(Math.random() * 1000) % effects.length];
    }, []);
    return aos;
}