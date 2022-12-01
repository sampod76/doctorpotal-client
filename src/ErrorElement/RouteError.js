import React from 'react';
import { useRouteError } from 'react-router-dom';

const RouteError = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div>
            <h1 className='text-center text-lg p-5 text-red-500'>Opps !!!!</h1>
            <h1 className='text-center text-lg p-5 text-red-500'>Sorry , an unexpectend error has occurred </h1>
            <p className='text-center text-lg p-5 text-red-500'>
                {/* {
                    error.statusText || error.message
                } */}
            </p>
        </div>
    );
};

export default RouteError;