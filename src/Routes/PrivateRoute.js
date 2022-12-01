import React, { useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContex } from '../ContexApi/ContexApi';
import { useAdmin } from '../hookes/useAdmin';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContex);
   
    const location = useLocation()

    if (loader) {
        // console.log('first')
        return <div className='flex justify-center items-center'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>

    }

    if (user?.uid ) {
        return children
    }

    return <Navigate to='/login' state={{ from: { location } }}></Navigate>
};

export default PrivateRoute;