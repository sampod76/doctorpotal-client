import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import ConfirmModal from '../../../ConfirmModal/ConfirmModal';

const ManagDoctors = () => {
    const [deletingDoctor, setDeletingDoctors] = useState(null)

    const closeModal = () => {
        setDeletingDoctors(null)
    }



    const { data: doctors = [], isLoading, error,refetch } = useQuery({
        queryKey: ['managdoctors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            const data = await res.json()
            if (data.success) {
                return data.data
            } else {
                return toast.error(data.message)
            }
        }
    })

    const handleDeleteDoctor = (doctor) => {
     
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    refetch()
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            })
            .catch(error => toast.error(error.message))

    }


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



    return (
        <div>
            <h1>{doctors &&
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>speciality</th>
                                <th>Delete</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            doctors.map(doctor => <tbody key={doctor._id}>

                                <tr >
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={doctor.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {doctor.email}

                                    </td>
                                    <td>{doctor.speciality}</td>
                                    <th>
                                        <label onClick={() => setDeletingDoctors(doctor)} htmlFor="confirm-modal" className="btn">Delete</label>

                                    </th>
                                </tr>


                            </tbody>)
                        }




                    </table>
                </div>
            }</h1>
            {
                deletingDoctor && <ConfirmModal
                    title='Are you sure deleting '
                    message={`If you delet ${deletingDoctor.name}`}
                    closeModal={closeModal}
                    handleDeleteDoctor={handleDeleteDoctor}
                    Modaldata={deletingDoctor}

                >

                </ConfirmModal>
            }
        </div>
    );
};

export default ManagDoctors;