import { useMemo } from 'react';
import {bounce, bounceIn, bounceInDown, bounceOut, fadeIn, fadeInDown, 
 fadeInDownBig, fadeInUp, fadeInUpBig, fadeOutDown, fadeOut, fadeOutRight, 
 flip, flipInY, flipOutX, flash, headShake, hinge, rollIn, jello, swing, slideInDown
} from 'react-animations';
import Radium from 'radium';

const effects=[bounce, bounceIn, bounceInDown, bounceOut, fadeIn, fadeInDown, 
    fadeInDownBig, fadeInUp, fadeInUpBig, fadeOutDown, fadeOut, fadeOutRight, 
    flip, flipInY, flipOutX, flash, headShake, hinge, rollIn, jello, swing, slideInDown];

export const useAnimation=()=>{
    
    const effect=useMemo(()=>{
        return effects[Math.floor(Math.random() * 1000) % effects.length];
    }, []);

    return {
        animation: 'x 1s',
        animationName: Radium.keyframes(effect, 'bounce')    
    };
}