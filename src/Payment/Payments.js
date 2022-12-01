
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import ChackoutForm from './ChackoutForm';
import { useLoaderData } from 'react-router-dom';
const stripePromise = loadStripe("pk_test_51M6MdfAdJu4EQtRS8tBWituEbmkenJzMLqByrl2hBhZ47U8p8sGAKdC05mwlEiZVCNntARDELfFH7xjofCb8Z99N004Y63poiB");
// console.log(stripePromise);

const Payments = () => {
    const { data: booking } = useLoaderData()
    // console.log(data);
    return (
        <div>
            <h1 className='text-2xl p-2 text-blue-800'>Payment for {booking.treatment}</h1>
            <h1 className='text-2xl p-2 text-blue-800'>Please pay {booking.price} for your appointment booking {booking.appointmentDate} at {booking.slot}</h1>
            <Elements stripe={stripePromise}>
                <ChackoutForm booking={booking} />
            </Elements>
        </div>
    );
};

export default Payments;