
// import React, { useEffect } from 'react';
// import toast from 'react-hot-toast';

// const ImgUpload = (doctor) => {

//     useEffect(() => {
//         if (doctor) {
//             fetch('http://localhost:5000/doctors', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                     authorization: localStorage.getItem('token')
//                 },
//                 body: JSON.stringify(doctor)
//             })
               
//         }
//     }, [doctor])


// };

// export default ImgUpload;




import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const ImgUpload = (doctor) => {

    useEffect(() => {
        if (doctor) {
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

                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
                .catch(err => toast.error(err.message + 'catch error'))
        }
    }, [doctor])


};

export default ImgUpload;