
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../ContexApi/ContexApi';

const Login = () => {

    const { passwordForget, singInEmailPassword, googleSingIn, loader, setLoader, } = useContext(AuthContex)
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const from = location?.state?.from?.pathname || '/'

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

    const handelForgetPassword = () => {
        // passwordForget()
    }

    const onSubmitForm = data => {

        singInEmailPassword(data.email, data.password)
            .then(result => {
                toast.success('successfull login ')
                getJwtToken(data.email)
            })
            .catch(err => {
                toast.error(err.message)
                setLoader(false)
            })

        // console.log(data)
    };



    const handleGoogelLogin = () => {
        googleSingIn()
            .then(result => {
                console.log(result.user);
                toast.success('Successfull Login Google')
                getJwtToken(result.user.email)
            })
            .catch(err => {
                setLoader(false)
                toast.error(err.message)
            })
    }

    const getJwtToken = (email) => {
        fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    navigate(from, { replace: true })
                }
                else {
                    toast.error(data.message)
                }
            })

    }
    return (
        <div className='flex justify-center items-center h-screen'>

            <form onSubmit={handleSubmit(onSubmitForm)} className=' bg-slate-300 w-1/3 min-h-96 rounded-lg p-3'>
                <h1 className='text-center text-4xl'>Login</h1>
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
                <a onClick={handelForgetPassword}>Forget Password?</a>
                <button type="submit" className='btn btn-primary my-2 w-full'>Submit</button>
                <p>New to Doctors Portal <Link to='/register' className='text-teal-700 decoration-emerald-400 underline'>Create new Account</Link></p>
                <button onClick={handleGoogelLogin} className='btn  my-2 w-full'> Google Login</button>
            </form>
        </div>
    );
};

export default Login;