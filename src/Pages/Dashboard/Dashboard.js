import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner';
import { AuthContex } from '../../ContexApi/ContexApi';

const Dashboard = () => {
    const { user } = useContext(AuthContex)

    const { isLoading, error, data: bookingData = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            const data = await res.json();
            // console.log(data);
            if (data.success) {
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
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    }

    // if (error) {
    //     toast.error(error.message)
    // }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-auto">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Time</th>
                            <th>AppointmentDate</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingData &&
                            bookingData?.map((booking, i) => <tr key={i} booking={booking}>
                                <th>{i + 1}</th>
                                <td>{booking.patient ? booking.patient : 'No name'}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.slot}</td>
                                <th>{booking.appointmentDate}</th>
                                <th>
                                    {
                                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}> <button className='btn '>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <button className='btn '>Paide</button>
                                    }
                                </th>
                            </tr>)
                        }




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;