import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import imgUpload from '../../../hookes/imgUpload';

const AddDoctor = () => {
    const { register, handleSubmit, watch, formState: { errors } ,reset} = useForm()
    const [imageUp, setImage] = useState({})
    const { data: speciality = [], isLoading, error } = useQuery({
        queryKey: ['Speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json()
            if (data.success) {
                return data.data
            } else {
                toast.error(data.message)
            }
        }
    })


    if (isLoading) {
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



    //add doctor 

    const handleAddDoctor = async (data) => {
        const { email, name, password, image, speciality } = data
        // console.log(image.length);
        const imageOnly = image.length ? image : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        // console.log(imageOnly)
        // const image = data.image[0]
        // console.log(image[0])

        const formData = new FormData()
        formData.append('image', image[0])

        const url = `https://api.imgbb.com/1/upload?key=df414536c62b8278623aa0a114d75d61`
        const img = await fetch(url, {
            method: "POST",
            body: formData
        });
        const imgUrl = await img.json();

        if (imgUrl.success && imgUrl.status === 200) {
            setImage(imgUrl)
            const doctor = {
                name,
                email,
                speciality,
                image: imgUrl?.data?.display_url
            }
            console.log(doctor);
            // imgUpload(doctor)
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.success) {

            //             toast.success(data.message)
            //         } else {
            //             toast.error(data.message)
            //         }
            //     })
            //     .catch(err => toast.error(err.message + 'catch error'))

            fetch('http://localhost:5000/doctors', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(doctor)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        reset()
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
                .catch(err => toast.error(err.message + 'catch error'))

        } else {
            return toast.error(imgUrl.error.message)
        }
        console.log(imgUrl?.data?.display_url)



    }



    return (
        <div className='flex justify-center my-4'>
            <form onSubmit={handleSubmit(handleAddDoctor)} className=' bg-slate-300 w-1/3 min-h-96 rounded-lg p-3'>
                <h1 className='text-center text-4xl'>Add Doctor</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name', { required: true })} placeholder="name" className="input input-bordered w-full" />
                    {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', { required: true })} placeholder="Email" className="input input-bordered w-full" />
                    {errors?.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', { required: true })} placeholder="Password" className="input input-bordered w-full" />
                    {errors?.password && <p className='text-red-500'> {errors.password.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select  {...register('speciality')} defaultValue={"Pick Your Speciality"} className="select select-primary w-full max-w-xs">
                        <option value='Pick Your Speciality'>Pick Your Speciality</option>

                        {
                            speciality &&
                            speciality.map(special => <option key={special._id} value={special.name}>{special.name}s</option>)
                        }
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="img" className='text-lg font-bold'>Image</label>
                    <input
                        {...register('image')}
                        accept='image/*'
                        type="file"
                        required
                        id="img"
                    />
                </div>
                <button className='btn flex mx-auto my-2 w-full' type="submit">Sing Up </button>
            </form>
        </div>
    );
};

export default AddDoctor;