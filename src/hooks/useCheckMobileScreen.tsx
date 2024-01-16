'use client';
import React, {useEffect, useState} from "react";

const useCheckMobileScreen = (handler: () => void) => {


    useEffect(() => {
        const handleWindowSizeChange = () => {
            if(window.innerWidth >= 1024) {
                handler();
                return;
            }
            return;
    }
        window.addEventListener('resize', handleWindowSizeChange);
        
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [handler]);

}

export default useCheckMobileScreen