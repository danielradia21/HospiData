
import {AdminDashBord} from "../cmps/admin/admin-dashbord"
import {AdminDoctorsList} from "../cmps/admin/admin-doctors-list"
import { AdminMainContect } from "../cmps/admin/admin-main-contect"
import {AdminPatienceList} from "../cmps/admin/admin-patience-list"
import { AdminProfile } from "../cmps/admin/admin-proflie"
import { AdminSideNavBar } from "../cmps/admin/admin-side-nav"

const _ADMIN =  {
       _id: "u101",
       fullName: "Orly Amdadi",
       userName: "orly@amdadi.com",
      password: "tinkerbell",
       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxyoKZ4E4mGbUJ7owqGf1P9hdoCUe7wHaBAoMpIc12Quq2tETjLYq3OA-EtPSgNVXcsg&usqp=CAU",
      isAdmin:true,
      type:"doctor",
         patience:[
             {
                 _id:"u-103",
                fullName:"tino blom",
                imgUrl: "http://some-img"
            }
          ],
         meetings:[
                   {
                    _id:"m-101",
                    fullName:"tino blom",
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

export function AdminPage() {
    return <section className="flex ">
         <div className="admin-side flex column align-center">
             <AdminProfile admin={_ADMIN}/>
             <AdminSideNavBar routes={adminNavLinks} />
         </div>
         <AdminMainContect routes={adminNavLinks}/>
    </section>
}
