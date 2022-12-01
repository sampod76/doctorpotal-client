import React, { useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContex } from '../ContexApi/ContexApi';
import { useAdmin } from '../hookes/useAdmin';

const AdminPrivetRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContex)
    const [isAdmin,isAdminloading] = useAdmin(user?.email)
    const location = useLocation()

    if (loader || isAdminloading) {
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

    if (user?.uid && isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ from: { location } }}></Navigate>
};

export default AdminPrivetRoute;