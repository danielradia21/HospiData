
import { NavLink, Route, Switch } from "react-router-dom"
import {AdminDashBord} from "../cmps/admin/admin-dashbord"
import {AdminDoctorsList} from "../cmps/admin/admin-doctors-list"
import { AdminMainContect } from "../cmps/admin/admin-main-contect"
import {AdminPatienceList} from "../cmps/admin/admin-patience-list"
import { AdminProfile } from "../cmps/admin/admin-proflie"
import { AdminSideNavBar } from "../cmps/admin/admin-side-nav"

const _ADMIN =  {
       _id: "u101",
          fullname: "Orly Amdadi",
       userName: "orly@amdadi.com",
      password: "tinkerbell",
       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxyoKZ4E4mGbUJ7owqGf1P9hdoCUe7wHaBAoMpIc12Quq2tETjLYq3OA-EtPSgNVXcsg&usqp=CAU",
      isAdmin:true,
      type:"doctor",
         patience:[
             {
                 _id:"u-103",
                 fullname:"tino blom",
                imgUrl: "http://some-img"
            }
          ],
         meetings:[
                   {
                    _id:"m-101",
                    fullname:"tino blom",
                    date:"16/01/2022 09:00",
                 }
          ]
        
}

const adminNavLinks = [

    { 
        path: '/admin/DashBord',
        component: AdminDashBord,
        label: 'DashBord',
    },
    { 
        path: '/admin/doctors',
        component: AdminDoctorsList,
        label: 'Doctors',
    },
    { 
        path: '/admin/patience',
        component: AdminPatienceList,
        label: 'Patience',
    },

]


const nestedRoutes = [
    {
        path: '/doctor-page/meetings',
        component: AdminDashBord,
    },
    {
        path: '/doctor-page/patiences',
        component: AdminDoctorsList,
    },
    {
        path: '/doctor-page/history',
        component: AdminPatienceList,
    },
];

export function AdminPage() {
    // return <section className="main-container ">
    //     <div className="flex" >
    //      <div className="admin-side flex column align-center">
    //          <AdminProfile admin={_ADMIN}/>
    //          <AdminSideNavBar routes={adminNavLinks} />
    //      </div>
    //      <AdminMainContect routes={adminNavLinks}/>
    //      </div>
    // </section>

    // return <div className="main-wrapper">
    //         <div className="main-contents">
    //             <div className="profile-section">
    //                 <div className="img-wrapper">
    //                     <img src={_ADMIN.imgUrl} alt="" />
    //                 </div>

    //                 <div className="name-section">
    //                     <div className="details">
    //                         <p className="title">{_ADMIN.fullname}</p>
    //                     </div>
    //                     <div className="details">
    //                         <p>Admin</p>
    //                     </div>
    //                 </div>

    //                 <div className="details-wrapper">
    //                     {/* <div className="details">
    //                         <span>icon</span>
    //                         <p>Name</p>
    //                     </div>
    //                     <div className="details">
    //                         <span>icon</span>
    //                         <p>Name</p>
    //                     </div> */}
    //                      <AdminSideNavBar routes={adminNavLinks} />
    //                 </div>
    //             </div>
    //             <div>
                   
                       
    //                     <AdminMainContect routes={adminNavLinks}/>
                  
    //             </div> 
    //             </div>
    //             </div>   



//     return  <div className="main-wrapper">
//     <div className="main-contents">
//         <div className="profile-section">
//             <div className="main-profile-container">
//                 <div className="img-wrapper">
//                     <img
//                         src="https://randomuser.me/api/portraits/women/39.jpg"
//                         alt=""
//                     />
//                 </div>

//                 <div className="name-section">
//                     <div>
//                         <div className="details">
//                             <p className="title">Orly Amadi</p>
//                         </div>
//                         <div className="details">
//                             <p className="sub-title">Doctor</p>
//                         </div>
//                     </div>
//                     <div className="logout-btn">
//                         <button>logout</button>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="details-wrapper"> */}

//             <AdminSideNavBar routes={adminNavLinks} />
//                 {/* <div className="details">
//                     <NavLink to="/doctor-page/meetings">
//                         Meetings
//                     </NavLink>
//                 </div>
//                 <div className="details">
//                     <NavLink to="/doctor-page/patiences">
//                         Patiences
//                     </NavLink>
//                 </div>
//                 <div className="details">
//                     <NavLink to="/doctor-page/history">History</NavLink>
//                 </div> */}
//             {/* </div> */}
//             <div className="main-content-section">
//                     <div className="main-content">
//                         <div className="contents">
//                         {/* <AdminMainContect routes={adminNavLinks}/> */}
//                         </div>
//                     </div>
//                 </div>
//         </div>
//      </div>
//  </div>        <div className="main-wrapper">
return   <div className="main-wrapper">
            <div className="main-contents">
                <div className="profile-section">
                    <div className="main-profile-container">
                        <div className="img-wrapper">
                            <img
                                src="https://randomuser.me/api/portraits/women/39.jpg"
                                alt=""
                            />
                        </div>

                        <div className="name-section">
                            <div>
                                <div className="details">
                                    <p className="title">{_ADMIN.fullname}</p>
                                </div>
                                <div className="details">
                                    <p className="sub-title">Admin</p>
                                </div>
                            </div>
                            <div className="logout-btn">
                                <button>logout</button>
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
                    // {/* <div className="others-section">
                    //     <div className="first-other"></div>
                    //     <div className="sec-other"></div>  */}
                         
                    // {/* </div>
                // div>
//             </div>
//         </div>
//     </div>
// }
                    
