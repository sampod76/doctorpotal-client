import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ColorRing, RevolvingDot } from 'react-loader-spinner';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP')
    // console.log(date);
    const { data: appointmentOptions, isLoading, error, refetch } = useQuery({
        queryKey: ['appointmentOptions',date], //জে কোন নাম
      
         queryFn: async () => {
             const res = await fetch(`http://localhost:5000/appointmentOption?date=${date}`)
             const data = await res.json()
             return data
         }
       

        // queryFn: () => fetch(`http://localhost:5000/appointmentOption?date=${date}`)
        //     .then(res => res.json())
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

    if (error) {
        toast.error(error.message)
    }



    /*  ================== normal ==================
  
      const [appointmentOptions, setAppointmentOptions] = useState([]);
  
      useEffect(() => {
          fetch('http://localhost:5000/appointmentOption')
              .then(res => res.json())
              .then(data => {
                  if (data.success) {
                      setAppointmentOptions(data.data)
                  } else {
                      toast.error(data.message)
                  }
              })
      }, [])
      */

    // console.log(appointmentOptions);

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.data.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
          
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;