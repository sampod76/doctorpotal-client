import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContex } from '../ContexApi/ContexApi';
import { useAdmin } from '../hookes/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContex)
    const [isAdmin] = useAdmin(user?.email)
  

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        {
                            isAdmin && <>
                            <li><Link to='/dashboard/allusers'>All user</Link></li>
                            <li><Link to='/dashboard/adddoctor'>Add Doctor</Link></li>
                            <li><Link to='/dashboard/managdoctors'>Manag Doctor</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
          

        </div>
    );
};

export default DashboardLayout;