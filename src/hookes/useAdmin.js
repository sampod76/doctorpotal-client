import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminloading, setIsAdminLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setIsAdmin(true)
                        setIsAdminLoading(false)
                    }
                })
        }
    }, [email])

    return [isAdmin, isAdminloading]
};

