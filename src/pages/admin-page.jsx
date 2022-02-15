
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {AdminDashBord} from "../cmps/admin/admin-dashbord"
import {AdminDoctorsList} from "../cmps/admin/admin-doctors-list"
import { AdminMainContect } from "../cmps/admin/admin-main-contect"
import {AdminPatienceList} from "../cmps/admin/admin-patience-list"
import { AdminSideNavBar } from "../cmps/admin/admin-side-nav"
import { socketService,SOCKET_EMIT_USER_WATCH } from "../services/socket.service"
import { getLoggedInUser, onLogout } from "../store/actions/user.actions"


const adminNavLinks = [

    { 
        path: '/admin/dashboard',
        component: AdminDashBord,
        label: 'Dash Board',
    },
    { 
        path: '/admin/doctors',
        component: AdminDoctorsList,
        label: 'Doctors',
    },
    { 
        path: '/admin/patients',
        component: AdminPatienceList,
        label: 'Patients',
    },

]




export function AdminPage() {

    const { user } = useSelector((state) => state.userModule);

const dispatch = useDispatch();

useEffect(() => {
    if (!user) dispatch(getLoggedInUser());
    if(user) {
        socketService.emit(SOCKET_EMIT_USER_WATCH,user._id)
        
    }
}, [user]);

const onLogOut = () => {
    window.location.href = '/';
    dispatch(onLogout());
};

if(!user) return <div>loding...</div>
return   <div className="main-wrapper">
            <div className="main-contents">
                <div className="profile-section">
                    <div className="main-profile-container">
                        <div className="img-wrapper">
                            <img
                                src={user.imgUrl}
                                alt=""
                            />
                        </div>

                        <div className="name-section">
                            <div>
                                <div className="details">
                                    <p className="title">{user.fullname}</p>
                                </div>
                                <div className="details">
                                    <p className="sub-title">Admin</p>
                                </div>
                            </div>
                            <div className="logout-btn">
                                <button onClick={onLogOut}>logout</button>
                            </div>
                        </div>
                    </div>

               <AdminSideNavBar routes={adminNavLinks}/>
                </div>
                <div className="main-content-section">
                    <div className="main-content">
                            <AdminMainContect routes={adminNavLinks}/>
                    </div>
                </div>
            </div>
        </div>
}
