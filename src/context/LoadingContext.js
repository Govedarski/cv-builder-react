import {createContext, useState} from 'react';
import {LoadingSpinner} from '../components/helpers/LoadingSpinner/LoadingSpinner.js';

export const LoadingContext = createContext({});

export const LoadingProvider = ({
                                    children,
                                }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {isLoading && <LoadingSpinner/>}
            {children}
        </LoadingContext.Provider>
    );
};

