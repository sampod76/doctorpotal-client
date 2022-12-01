import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/firebase.init';

export const AuthContex = createContext()
const auth = getAuth(app)

const ContexApi = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const googelProvider = new GoogleAuthProvider();

    const googleSingIn = () => {
        setLoader(true)
        return signInWithPopup(auth, googelProvider)
    }

    const creaiteAccountEmaiAndPassword = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singInEmailPassword = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        localStorage.removeItem('token')
        return signOut(auth)
    }

    const passwordForget = (email) => {

        return sendPasswordResetEmail(auth, email)
    }

    const updateUserDetails = (data) => {
        setLoader(true)
        return updateProfile(auth.currentUser, data)

    }


    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, currentUser => {
            setLoader(false)
            setUser(currentUser)

        })

        return () => {
            unsuscribe()
        }

    }, [])

    // console.log(user);

    const authInfo = { singInEmailPassword, creaiteAccountEmaiAndPassword, googleSingIn, loader, setLoader, user, logOut, passwordForget, updateUserDetails }
    return (
        <div>
            <AuthContex.Provider value={authInfo}>
                {children}
            </AuthContex.Provider>
        </div>
    );
};

export default ContexApi;