import { createBrowserRouter } from "react-router-dom";
import RouteError from "../../ErrorElement/RouteError";
import DisplayError from "../../ErrorElement/RouteError";
import DashboardLayout from "../../Layout/DashboardLayout";

import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import Allusers from "../../Pages/Dashboard/Allusers";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import ManagDoctors from "../../Pages/Dashboard/ManagDoctors/ManagDoctors";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/LoginAndRegister/Login";
import Register from "../../Pages/LoginAndRegister/Register";
import Payments from "../../Payment/Payments";
import AdminPrivetRoute from "../AdminPrivetRoute";
import PrivateRoute from "../PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,

        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <RouteError></RouteError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminPrivetRoute><Allusers></Allusers></AdminPrivetRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminPrivetRoute><AddDoctor></AddDoctor></AdminPrivetRoute>
            },
            {
                path: '/dashboard/managdoctors',
                element: <AdminPrivetRoute><ManagDoctors></ManagDoctors></AdminPrivetRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`),
                element: <AdminPrivetRoute><Payments></Payments></AdminPrivetRoute>
            }
        ]
    }, 
    {
        path: "*",
        element: <DisplayError></DisplayError>
    }
])

export default router;