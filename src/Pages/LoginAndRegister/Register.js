import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../ContexApi/ContexApi';

const Register = () => {
    const { creaiteAccountEmaiAndPassword, googleSingIn, loader, setLoader, user, logOut, updateUserDetails } = useContext(AuthContex)
    const [imageUp,setImage]=useState({})
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

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

    // google and create account 

    const handleGoogelLogin = () => {
        googleSingIn()
            .then(result => {
                console.log(result.user);
                toast.success('Successfull Login Google')

            })
            .catch(err => {
                setLoader(false)
                toast.error(err.message)
            })
    }

    // email and password create account 

    const onSubmitForm = async data => {

        const { email, name, password, image } = data
        console.log(image.length);
        // যদি ইমেজ সিলেট করে থাকা হয় তাহলে তার length 1 ওয়ান হবে ,আর যদি তার ল্যান্ড ওয়ান হয় তাহলে ওই জিনিসটাকে সেট করে দেবো | আর যদি সিলেট করে নেয়া হয় তার ল্যান্ড 0 আসে তাহলে এই লিংটাকে সেট করে দেবে
        const imageOnly = image.length? image : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        console.log(imageOnly)
        // const image = data.image[0]
        console.log(image)


        if (image.length) {
            const formData = new FormData()
            formData.append('image', imageOnly[0])

            const url = `https://api.imgbb.com/1/upload?key=df414536c62b8278623aa0a114d75d61`

            const img = await fetch(url, {
                method: "POST",
                body: formData
            });
            const imgUrl = await img.json();
            setImage(imgUrl)
            console.log(imgUrl.data.display_url);
        }




        creaiteAccountEmaiAndPassword(email, password)
            .then(result => {
                toast.success('successfull create account email')
                updateUserDetails({
                    displayName: name,
                    photoURL: imageUp?.data?.display_url || imageOnly
                })
                    .then(() => {
                        saveUser(name, email)
                        toast.success('successfully update')
                    })
                    .catch(err => {
                        toast.error(err.message)
                        setLoader(false)
                    })
                console.log(result.user)
                logOut().then(() => navigate('/login'))
            })
            .catch(err => {
                toast.error(err.message)
                setLoader(false)
            })


    };


    // অথবা এই জিনিসটা সরাসরি  updateUserDetails এর ভিতর দেয়া যেত

    const saveUser = (name, email) => {
        const user = { name, email }
        fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
            })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className=' bg-slate-300 w-1/3 min-h-96 rounded-lg p-3'>

                <form onSubmit={handleSubmit(onSubmitForm)} >
                    <h1 className='text-center text-4xl'>Create new Account</h1>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name', { required: 'This fuild is required' })} placeholder="Name" className="input input-bordered w-full" />
                        {errors?.name && <p className='text-red-500'>{errors?.name?.message}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="img" className='text-lg font-bold'>Image</label>
                        <input
                            {...register('image')}
                            accept='image/*'
                            type="file"

                            id="img"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: 'email must be required' })} placeholder="Email" className="input input-bordered w-full" />
                        {errors?.email && <p className='text-red-500'>{errors?.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', { required: 'password is must be provide' })} placeholder="Password" className="input input-bordered w-full" />
                        {errors?.password && <p className='text-red-500'>{errors?.password?.message}</p>}
                    </div>

                    <button type="submit" className='btn btn-primary my-2 w-full'>Submit</button>
                    <div className="divider">OR</div>
                    <p>New to Doctors Portal <Link to='/login' className='text-teal-700 decoration-emerald-400 underline'>Login email ..</Link></p>
                </form>
                <button onClick={handleGoogelLogin} type="submit" className='btn  my-2 w-full'> Google Login</button>
            </div>
        </div>
    );
};

export default Register;