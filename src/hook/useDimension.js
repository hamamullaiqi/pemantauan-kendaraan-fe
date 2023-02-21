import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const defFontSize={lg:22, md:18, sm:12, xs:10, xl:18};

export const useFontSize=()=>{
    const {width, height} = useWindowDimensions();
    const [fontSize, setFontSize]=useState(defFontSize);
    useEffect(()=>{
        if(width>1000){
            setFontSize(defFontSize)
        }
        else if(width<=1000 && width>800){
            setFontSize({lg:20, md:16, sm:11, xs:9, xl:17});
        }
        else if(width<800){
            setFontSize({lg:18, md:14, sm:10, xs:9, xl:16});
        }
    }, [width]);

    return fontSize;
}

export const useViewSize = () =>{
    const {width, height} = useWindowDimensions();
    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        if(width<1200){
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
        // else if(width<=1000 && width>800){
        //     setFontSize({lg:20, md:16, sm:11, xs:9, xl:17});
        // }
        // else if(width<800){
        //     setFontSize({lg:18, md:14, sm:10, xs:9, xl:16});
        // }
    }, [width]);

    return isMobile

}