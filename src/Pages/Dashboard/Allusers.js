import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';

const Allusers = () => {
    // const [users, setUsers] = useState([]);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            const data = await res.json()
            if (data.success) {
                // console.log(data.data);
                return data.data
            } else {
                toast.error(data.message)
            }
        }
    })




    if (isLoading) {
        return <div className='flex justify-center items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperclassName="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    }

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message)
                    refetch()
                } else {
                    toast.error(data.message)
                }
            })
    }

    // console.log(users)

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user?.name || 'No name'}</td>
                                    <td>{user.email}</td>
                                    <td className='flex justify-center'>{user?.role === 'admin' ? <button className='btn btn-success '>Admin</button> : <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-primary'>Make Admin</button>}</td>
                                    <td><button className='btn btn-error'>Delete</button></td>

                                </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;